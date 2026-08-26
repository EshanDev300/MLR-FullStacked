import { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass = '', ...props }, ref) => <div ref={ref} {...props} className={`card-swap-card ${customClass} ${props.className || ''}`.trim()} />);
Card.displayName = 'Card';

const CardSwap = ({ width = 320, height = 220, cardDistance = 34, verticalDistance = 24, delay = 4200, pauseOnHover = true, onCardClick, children }) => {
  const items = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(() => items.map(() => ({ current: null })), [items.length]);
  const order = useRef(items.map((_, index) => index));
  const rootRef = useRef(null);
  const timeline = useRef(null);

  useEffect(() => {
    if (refs.length < 2) return undefined;
    const place = () => refs.forEach((entry, index) => {
      const slot = index;
      gsap.set(entry.current, { x: slot * cardDistance, y: -slot * verticalDistance, zIndex: refs.length - slot, xPercent: -50, yPercent: -50 });
    });
    place();
    const swap = () => {
      const [front, ...rest] = order.current;
      const frontElement = refs[front].current;
      const nextTimeline = gsap.timeline();
      timeline.current = nextTimeline;
      nextTimeline.to(frontElement, { y: '+=360', duration: .65, ease: 'power2.in' });
      rest.forEach((index, slot) => nextTimeline.to(refs[index].current, { x: slot * cardDistance, y: -slot * verticalDistance, zIndex: refs.length - slot, duration: .7, ease: 'power2.out' }, slot ? '<.08' : '<'));
      nextTimeline.to(frontElement, { x: (refs.length - 1) * cardDistance, y: -(refs.length - 1) * verticalDistance, zIndex: 1, duration: .55, ease: 'power2.out' }, '<.1');
      nextTimeline.call(() => { order.current = [...rest, front]; });
    };
    const interval = window.setInterval(swap, delay);
    const node = rootRef.current;
    const pause = () => { timeline.current?.pause(); };
    const resume = () => { timeline.current?.resume(); };
    if (pauseOnHover) { node.addEventListener('mouseenter', pause); node.addEventListener('mouseleave', resume); }
    return () => { clearInterval(interval); timeline.current?.kill(); if (pauseOnHover) { node.removeEventListener('mouseenter', pause); node.removeEventListener('mouseleave', resume); } };
  }, [cardDistance, delay, pauseOnHover, refs, verticalDistance]);

  return <div ref={rootRef} className="card-swap-container" style={{ width, height }}>
    {items.map((child, index) => isValidElement(child) ? cloneElement(child, { key: index, ref: refs[index], style: { width, height, ...(child.props.style || {}) }, onClick: (event) => { child.props.onClick?.(event); onCardClick?.(index); } }) : child)}
  </div>;
};

export default CardSwap;
