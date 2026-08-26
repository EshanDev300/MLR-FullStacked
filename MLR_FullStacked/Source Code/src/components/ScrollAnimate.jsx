import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollAnimate({ 
  children, 
  animation = 'fadeUp3D', 
  className = '', 
  delay = 0 
}) {
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let initialStyles = {};
    let animateStyles = {};

    switch (animation) {
      case 'fadeUp3D':
        initialStyles = { opacity: 0, y: 80, rotationX: 25, transformPerspective: 1000 };
        animateStyles = { opacity: 1, y: 0, rotationX: 0, ease: 'power3.out', duration: 1.2 };
        break;
      case 'zoomIn3D':
        initialStyles = { opacity: 0, scale: 0.85, rotationY: -15, transformPerspective: 1000 };
        animateStyles = { opacity: 1, scale: 1, rotationY: 0, ease: 'power3.out', duration: 1.2 };
        break;
      case 'tiltCard':
        initialStyles = { opacity: 0, y: 50, rotationX: 15, rotationY: -10, transformPerspective: 800 };
        animateStyles = { opacity: 1, y: 0, rotationX: 0, rotationY: 0, ease: 'power2.out', duration: 1 };
        break;
      default:
        initialStyles = { opacity: 0, y: 50 };
        animateStyles = { opacity: 1, y: 0, duration: 1 };
    }

    gsap.fromTo(el, initialStyles, {
      ...animateStyles,
      delay: delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%', // Triggers when the top of the element hits 85% down the viewport
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, delay]);

  return (
    <div ref={elRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}