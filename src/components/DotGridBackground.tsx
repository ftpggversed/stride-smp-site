// components/DotGridBackground.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const gap = 30;
    const radius = 3;
    const influence = 75;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x < canvas.width; x += gap * dpr) {
        for (let y = 0; y < canvas.height; y += gap * dpr) {
          const dx = (x / dpr) - mouse.x;
          const dy = (y / dpr) - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const color = dist < influence ? '#3B82F6' : '#444'; // blue or grey
          ctx.beginPath();
          ctx.arc(x, y, radius * dpr, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [mouse]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
