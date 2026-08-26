import { useCallback, useEffect, useRef } from 'react';
import './BorderGlow.css';

const BorderGlow = ({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '42 90 72',
  backgroundColor = '#120305',
  borderRadius = 22,
  glowRadius = 30,
  glowIntensity = 1,
  animated = true,
  colors = ['#f59e0b', '#e11d48', '#fbbf24'],
}) => {
  const cardRef = useRef(null);
  const getMetrics = useCallback((element, x, y) => {
    const { width, height } = element.getBoundingClientRect();
    const cx = width / 2;
    const cy = height / 2;
    const edge = Math.min(1, Math.max(0, 1 - Math.min(x, width - x, y, height - y) / Math.max(Math.min(width, height) / 2, 1)));
    return { edge, angle: `${(Math.atan2(y - cy, x - cx) * 180 / Math.PI + 450) % 360}deg` };
  }, []);

  const handlePointerMove = useCallback((event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const { edge, angle } = getMetrics(card, event.clientX - rect.left, event.clientY - rect.top);
    card.style.setProperty('--edge-proximity', edge);
    card.style.setProperty('--cursor-angle', angle);
  }, [getMetrics]);

  useEffect(() => {
    if (!animated || !cardRef.current) return undefined;
    const card = cardRef.current;
    card.classList.add('sweep-active');
    let frame;
    const started = performance.now();
    const sweep = (now) => {
      const progress = Math.min((now - started) / 1600, 1);
      card.style.setProperty('--edge-proximity', `${progress}`);
      card.style.setProperty('--cursor-angle', `${110 + progress * 355}deg`);
      if (progress < 1) frame = requestAnimationFrame(sweep);
      else card.classList.remove('sweep-active');
    };
    frame = requestAnimationFrame(sweep);
    return () => cancelAnimationFrame(frame);
  }, [animated]);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card ${className}`.trim()}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity / 100,
        '--glow-padding': `${glowRadius}px`,
        '--glow-color': `hsl(${glowColor} / ${Math.min(glowIntensity, 1)})`,
        '--gradient-one': colors[0],
        '--gradient-two': colors[1],
        '--gradient-three': colors[2],
        '--border-radius': `${borderRadius}px`,
      }}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
};

export default BorderGlow;
