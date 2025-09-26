'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSkin } from '@/hooks/useSkin';
import { useIsClientStable } from '@/hooks/useClientOnly';

interface DecorBackgroundProps {
  heroStage: number;
  className?: string;
}

export default function DecorBackground({ heroStage, className = '' }: DecorBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { tokens, skinConfig } = useSkin();
  const isClient = useIsClientStable();

  useEffect(() => {
    if (!isClient) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []); // Пустой массив - выполняется только один раз

  // Генерируем позиции для неон-точек с фиксированными значениями для SSR
  const generateNeonPoints = () => {
    // Используем детерминированные значения для SSR совместимости
    const seedPoints = [
      { x: 20, y: 30, size: 3.2, delay: 0.5 },
      { x: 70, y: 15, size: 2.8, delay: 1.2 },
      { x: 45, y: 80, size: 4.1, delay: 0.8 },
      { x: 85, y: 60, size: 3.5, delay: 1.5 },
      { x: 15, y: 70, size: 2.9, delay: 0.3 },
      { x: 60, y: 25, size: 3.8, delay: 1.0 },
      { x: 30, y: 90, size: 3.1, delay: 0.7 },
      { x: 90, y: 40, size: 4.3, delay: 1.3 },
      { x: 50, y: 55, size: 2.6, delay: 0.9 },
      { x: 75, y: 85, size: 3.7, delay: 1.1 },
      { x: 25, y: 45, size: 3.4, delay: 0.6 },
      { x: 80, y: 75, size: 2.7, delay: 1.4 },
    ];
    
    return seedPoints.map((point, i) => ({
      id: i,
      x: point.x,
      y: point.y,
      size: point.size,
      delay: point.delay,
    }));
  };

  const neonPoints = generateNeonPoints();

  // Анимации для разных этапов
  const getDecorVariants = () => {
    switch (heroStage) {
      case 1:
        return {
          opacity: 0.6,
          scale: 1,
          blur: 0,
        };
      case 2:
        return {
          opacity: 0.8,
          scale: 1.05,
          blur: 1,
        };
      case 3:
        return {
          opacity: 1,
          scale: 1.2,
          blur: 2,
        };
      case 4:
        return {
          opacity: 0.9,
          scale: 1.1,
          blur: 1.5,
        };
      default:
        return {
          opacity: 0.6,
          scale: 1,
          blur: 0,
        };
    }
  };

  const variants = getDecorVariants();

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Неон-точки */}
      <motion.div
        className="absolute inset-0"
        animate={variants}
        transition={{
          duration: heroStage === 3 ? 1.2 : 0.8,
          ease: heroStage === 3 ? [0.22, 1, 0.36, 1] : 'easeOut'
        }}
      >
        {neonPoints.map((point) => (
          <motion.div
            key={point.id}
            className="absolute rounded-full"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: `${point.size}px`,
              height: `${point.size}px`,
              background: `radial-gradient(circle, ${tokens.primary}80 0%, transparent 70%)`,
              boxShadow: `0 0 20px ${tokens.primary}60, 0 0 40px ${tokens.primary}30`,
              filter: `blur(${variants.blur}px)`,
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + point.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Лучи света */}
      <motion.div
        className="absolute inset-0"
        animate={variants}
        transition={{
          duration: heroStage === 3 ? 1.2 : 0.8,
          ease: heroStage === 3 ? [0.22, 1, 0.36, 1] : 'easeOut'
        }}
      >
        {/* Вертикальные лучи */}
        {[20, 40, 60, 80].map((x, index) => (
          <motion.div
            key={`vertical-${index}`}
            className="absolute top-0 h-full"
            style={{
              left: `${x}%`,
              width: '1px',
              background: `linear-gradient(to bottom, transparent 0%, ${tokens.primary}30 50%, transparent 100%)`,
              boxShadow: `0 0 10px ${tokens.primary}50`,
              filter: `blur(${variants.blur}px)`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scaleY: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Горизонтальные лучи */}
        {[25, 50, 75].map((y, index) => (
          <motion.div
            key={`horizontal-${index}`}
            className="absolute left-0 w-full"
            style={{
              top: `${y}%`,
              height: '1px',
              background: `linear-gradient(to right, transparent 0%, ${tokens.primary}30 50%, transparent 100%)`,
              boxShadow: `0 0 10px ${tokens.primary}50`,
              filter: `blur(${variants.blur}px)`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleX: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 5 + index * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Центральный луч для H3 */}
      {heroStage === 3 && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute top-1/2 left-1/2 w-px h-96 -translate-x-1/2 -translate-y-1/2"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, ${tokens.primary}60 50%, transparent 100%)`,
              boxShadow: `0 0 30px ${tokens.primary}80`,
              filter: 'blur(2px)',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-96 h-px -translate-x-1/2 -translate-y-1/2"
            style={{
              background: `linear-gradient(to right, transparent 0%, ${tokens.primary}60 50%, transparent 100%)`,
              boxShadow: `0 0 30px ${tokens.primary}80`,
              filter: 'blur(2px)',
            }}
          />
        </motion.div>
      )}

      {/* Интерактивный луч, следующий за мышью */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: mousePosition.x - 1,
          top: mousePosition.y - 1,
          width: '2px',
          height: '2px',
          background: `radial-gradient(circle, ${tokens.primary}80 0%, transparent 70%)`,
          boxShadow: `0 0 20px ${tokens.primary}60`,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
