'use client';

import { useEffect, useRef, useState } from 'react';

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gap = 30;
    const radius = 3;
    const influence = 75;

    // Handle resizing canvas and scaling for DPR
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';

      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset any transform
      ctx.scale(dpr, dpr); // scale to DPR for crispness
    };

    let animationFrameId: number;

    // The drawing loop
    const draw = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x < canvas.width / (window.devicePixelRatio || 1); x += gap) {
        for (let y = 0; y < canvas.height / (window.devicePixelRatio || 1); y += gap) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const color = dist < influence ? '#FACC15' : '#444'; // yellow or grey

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
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