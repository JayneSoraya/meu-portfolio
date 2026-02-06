'use client';

import React, { useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth || 800;
    canvas.height = window.innerHeight || 600;

    interface Star {
      x: number; y: number; radius: number;
      vx: number; vy: number; alpha: number;
    }

    interface Nebula {
      x: number; y: number; radius: number;
      color: string; vx: number; vy: number;
    }

    const stars: Star[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        alpha: Math.random() * 0.5 + 0.5
      });
    }

    const nebulas: Nebula[] = [];
    for (let i = 0; i < 50; i++) {
      nebulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 50,
        color: `rgba(147, 51, 234, ${Math.random() * 0.1})`,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1
      });
    }

    let mouseXPos = 0;
    let mouseYPos = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseXPos = e.clientX;
      mouseYPos = e.clientY;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nebulas.forEach((nebula) => {
        const dx = mouseXPos - nebula.x;
        const dy = mouseYPos - nebula.y;
        const distance = Math.max(0.1, Math.sqrt(dx * dx + dy * dy));
        const force = Math.min(300 / (distance + 1), 2);

        nebula.x += nebula.vx + (dx / distance) * force * 0.1;
        nebula.y += nebula.vy + (dy / distance) * force * 0.1;

        if (nebula.x < 0) nebula.x = canvas.width;
        if (nebula.x > canvas.width) nebula.x = 0;
        if (nebula.y < 0) nebula.y = canvas.height;
        if (nebula.y > canvas.height) nebula.y = 0;

        const safeRadius = Math.max(0.1, nebula.radius);
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0.1,
          nebula.x, nebula.y, safeRadius
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          nebula.x - safeRadius,
          nebula.y - safeRadius,
          safeRadius * 2,
          safeRadius * 2
        );
      });

      stars.forEach((star) => {
        const dx = mouseXPos - star.x;
        const dy = mouseYPos - star.y;
        const distance = Math.max(0.1, Math.sqrt(dx * dx + dy * dy));
        const force = Math.min(200 / (distance + 1), 1.5);

        star.x += star.vx + (dx / distance) * force * 0.05;
        star.y += star.vy + (dy / distance) * force * 0.05;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        if (Math.random() > 0.99) {
          star.alpha = Math.random() * 0.5 + 0.5;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#0a0a0a' }}
    />
  );
};

export default SpaceBackground;