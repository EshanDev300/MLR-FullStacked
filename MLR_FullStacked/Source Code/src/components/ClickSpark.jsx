import { useCallback, useEffect, useRef } from 'react';
import { soundSynth } from '../utils/sound';
import './ClickSpark.css';

const ClickSpark = ({
  sparkColor = '#ffd166',
  sparkSize = 10,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 420,
  easing = 'ease-out',
  extraScale = 1,
  children,
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const ease = useCallback((value) => {
    if (easing === 'linear') return value;
    if (easing === 'ease-in') return value * value;
    if (easing === 'ease-in-out') return value < .5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;
    return value * (2 - value);
  }, [easing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return undefined;
    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();
    let frame;
    const draw = (timestamp) => {
      const ctx = canvas.getContext('2d');
      const rect = parent.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      sparksRef.current = sparksRef.current.filter((spark) => {
        const progress = Math.min((timestamp - spark.startTime) / duration, 1);
        const eased = ease(progress);
        const distance = eased * sparkRadius * extraScale;
        const length = sparkSize * (1 - eased);
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(spark.x + distance * Math.cos(spark.angle), spark.y + distance * Math.sin(spark.angle));
        ctx.lineTo(spark.x + (distance + length) * Math.cos(spark.angle), spark.y + (distance + length) * Math.sin(spark.angle));
        ctx.stroke();
        return progress < 1;
      });
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [duration, ease, extraScale, sparkColor, sparkRadius, sparkSize]);

  const handleClick = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const now = performance.now();
    sparksRef.current.push(...Array.from({ length: sparkCount }, (_, index) => ({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      angle: index * Math.PI * 2 / sparkCount,
      startTime: now,
    })));
    soundSynth.playClick();
  };

  return <div className="click-spark-root" onClick={handleClick}>
    <canvas ref={canvasRef} className="click-spark-canvas" aria-hidden="true" />
    {children}
  </div>;
};

export default ClickSpark;
