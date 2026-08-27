import { useEffect, useRef } from 'react';
import './InteractiveGridBackground.css';

export default function InteractiveGridBackground({
  gridSize = 56,
  gridColor = 'rgba(245, 158, 11, 0.16)',
  effectColor = 'rgba(255, 62, 62, 0.82)',
  trailLength = 5,
  idleSpeed = 0.08,
  glow = true,
  glowRadius = 18,
  idleRandomCount = 3,
  children,
  className = '',
  ...props
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const pointerRef = useRef({ x: -1, y: -1, active: false, lastMove: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    // Detect mobile or low power devices
    const isMobile = window.innerWidth < 768 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    const isLowPower = isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

    const context = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!context) return undefined;

    const actualIdleCount = isLowPower ? 1 : idleRandomCount;
    const actualTrailLength = isLowPower ? 3 : trailLength;
    const enableGlow = isLowPower ? false : glow; // Disable expensive shadowBlur on mobile GPUs

    const trails = [];
    const idleTargets = Array.from({ length: actualIdleCount }, () => ({ x: 0, y: 0 }));
    const idlePositions = idleTargets.map((target) => ({ ...target }));
    let width = 1;
    let height = 1;
    let columns = 1;
    let rows = 1;
    let frameId;
    let lastDrawTime = 0;
    const targetFps = isLowPower ? 30 : 60;
    const frameInterval = 1000 / targetFps;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = isLowPower ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      columns = Math.ceil(width / gridSize);
      rows = Math.ceil(height / gridSize);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      idleTargets.forEach((target, index) => {
        target.x = Math.floor(Math.random() * columns);
        target.y = Math.floor(Math.random() * rows);
        idlePositions[index].x = target.x;
        idlePositions[index].y = target.y;
      });
    };

    const addTrailCell = (x, y) => {
      const last = trails[0];
      if (last?.x === x && last?.y === y) return;
      trails.unshift({ x, y, created: performance.now() });
      if (trails.length > actualTrailLength * (actualIdleCount + 1)) trails.pop();
    };

    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      pointerRef.current = { x: Math.floor(x / gridSize), y: Math.floor(y / gridSize), active: true, lastMove: performance.now() };
      addTrailCell(pointerRef.current.x, pointerRef.current.y);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    resize();

    const draw = (time) => {
      frameId = requestAnimationFrame(draw);

      // Throttle for low-power mobile devices to save battery and maintain smooth 30-60 fps
      if (time - lastDrawTime < frameInterval) return;
      lastDrawTime = time;

      context.clearRect(0, 0, width, height);
      context.strokeStyle = gridColor;
      context.lineWidth = 1;
      context.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        context.moveTo(0, y + 0.5);
        context.lineTo(width, y + 0.5);
      }
      context.stroke();

      if (time - pointerRef.current.lastMove > 1800) {
        pointerRef.current.active = false;
        idlePositions.forEach((position, index) => {
          const target = idleTargets[index];
          if (Math.abs(target.x - position.x) < 0.02 && Math.abs(target.y - position.y) < 0.02) {
            target.x = Math.floor(Math.random() * columns);
            target.y = Math.floor(Math.random() * rows);
          }
          position.x += (target.x - position.x) * idleSpeed;
          position.y += (target.y - position.y) * idleSpeed;
          addTrailCell(Math.round(position.x), Math.round(position.y));
        });
      }

      trails.forEach((cell, index) => {
        const alpha = Math.max(0, 1 - index / (actualTrailLength * 1.35));
        context.fillStyle = effectColor.replace(/\d?\.?\d+\)$/g, `${alpha})`);
        if (enableGlow) {
          context.shadowColor = effectColor;
          context.shadowBlur = glowRadius * alpha;
        }
        context.fillRect(cell.x * gridSize + 1, cell.y * gridSize + 1, gridSize - 2, gridSize - 2);
      });
      if (enableGlow) {
        context.shadowBlur = 0;
      }
    };

    frameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
    };
  }, [effectColor, glow, glowRadius, gridColor, gridSize, idleRandomCount, idleSpeed, trailLength]);

  return (
    <div ref={containerRef} className={`interactive-grid-background ${className}`.trim()} {...props}>
      <canvas ref={canvasRef} className="interactive-grid-canvas" aria-hidden="true" />
      <div className="interactive-grid-content">{children}</div>
    </div>
  );
}
