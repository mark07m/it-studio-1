'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSkin } from '@/hooks/useSkin';
import { useIsClientStable } from '@/hooks/useClientOnly';

interface AppBackgroundProps {
  className?: string;
}

export default function AppBackground({ className = '' }: AppBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { tokens } = useSkin();
  const isClient = useIsClientStable();

  useEffect(() => {
    if (!isClient) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      {/* Основной градиентный фон */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at ${mousePosition.x}% ${mousePosition.y}%,
              ${tokens.primary}15 0%,
              ${tokens.background.gradient.via}80 40%,
              ${tokens.background.gradient.from}95 70%,
              ${tokens.background.base} 100%
            )
          `
        }}
      />

      {/* Дополнительный градиент для глубины */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              ${tokens.primary}10 0%,
              transparent 30%,
              transparent 70%,
              ${tokens.secondary}05 100%
            )
          `
        }}
      />

      {/* Цифровая сетка */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${tokens.primary}10 1px, transparent 1px),
            linear-gradient(90deg, ${tokens.primary}10 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Параллакс эффект для мыши */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at ${mousePosition.x}% ${mousePosition.y}%,
              ${tokens.primary}05 0%,
              transparent 50%
            )
          `,
          transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.6}px)`,
        }}
      />

      {/* Декоративные элементы - частицы */}
      <div className="absolute inset-0">
        {/* Статичные точки с предопределенными позициями */}
        {[
          { left: 4.08, top: 40.39, delay: 0.5, duration: 2.3 },
          { left: 41.57, top: 7.30, delay: 1.2, duration: 2.8 },
          { left: 6.84, top: 52.33, delay: 0.8, duration: 2.1 },
          { left: 54.87, top: 10.75, delay: 1.5, duration: 2.6 },
          { left: 31.81, top: 75.79, delay: 0.3, duration: 2.4 },
          { left: 42.78, top: 4.94, delay: 1.8, duration: 2.7 },
          { left: 89.91, top: 90.12, delay: 0.7, duration: 2.2 },
          { left: 16.83, top: 31.07, delay: 1.3, duration: 2.9 },
          { left: 74.92, top: 10.53, delay: 0.9, duration: 2.5 },
          { left: 16.57, top: 1.06, delay: 1.6, duration: 2.0 },
          { left: 42.90, top: 71.29, delay: 0.4, duration: 2.8 },
          { left: 19.04, top: 10.19, delay: 1.1, duration: 2.3 },
          { left: 25.44, top: 29.66, delay: 1.7, duration: 2.6 },
          { left: 72.87, top: 18.70, delay: 0.6, duration: 2.1 },
          { left: 20.04, top: 55.09, delay: 1.4, duration: 2.7 }
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              backgroundColor: tokens.primary,
              boxShadow: `0 0 10px ${tokens.primary}`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}

        {/* Лучи света */}
        {[
          { left: 20, duration: 3, delay: 0 },
          { left: 50, duration: 4, delay: 0.5 },
          { left: 80, duration: 5, delay: 1.0 }
        ].map((ray, i) => (
          <motion.div
            key={`vertical-${i}`}
            className="absolute w-px h-full"
            style={{
              left: `${ray.left}%`,
              background: `linear-gradient(to bottom, transparent, ${tokens.primary}40, transparent)`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: ray.duration,
              repeat: Infinity,
              delay: ray.delay,
            }}
          />
        ))}

        {[
          { top: 30, duration: 4, delay: 0 },
          { top: 70, duration: 5, delay: 0.8 }
        ].map((ray, i) => (
          <motion.div
            key={`horizontal-${i}`}
            className="absolute w-full h-px"
            style={{
              top: `${ray.top}%`,
              background: `linear-gradient(to right, transparent, ${tokens.primary}40, transparent)`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: ray.duration,
              repeat: Infinity,
              delay: ray.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
