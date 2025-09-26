'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSkin } from '@/hooks/useSkin';
import { useIsClientStable } from '@/hooks/useClientOnly';

interface BaseBackgroundProps {
  heroStage: number;
  className?: string;
}

export default function BaseBackground({ heroStage, className = '' }: BaseBackgroundProps) {
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
  }, []); // Пустой массив - выполняется только один раз

  // Анимации для разных этапов Hero
  const getBackgroundVariants = () => {
    switch (heroStage) {
      case 1:
        return {
          gradient: {
            opacity: 1,
            scale: 1,
            rotate: 0,
          },
          grid: {
            opacity: 0.9,
            scale: 1,
            rotateX: 0,
          }
        };
      case 2:
        return {
          gradient: {
            opacity: 1,
            scale: 1.05,
            rotate: 2,
          },
          grid: {
            opacity: 0.85,
            scale: 1.02,
            rotateX: 2,
          }
        };
      case 3:
        return {
          gradient: {
            opacity: 0.8,
            scale: 1.12,
            rotate: 10,
          },
          grid: {
            opacity: 0.7,
            scale: 1.12,
            rotateX: 10,
          }
        };
      case 4:
        return {
          gradient: {
            opacity: 0.9,
            scale: 1.08,
            rotate: 5,
          },
          grid: {
            opacity: 0.8,
            scale: 1.05,
            rotateX: 5,
          }
        };
      default:
        return {
          gradient: { opacity: 1, scale: 1, rotate: 0 },
          grid: { opacity: 0.9, scale: 1, rotateX: 0 }
        };
    }
  };

  const variants = getBackgroundVariants();

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Основной градиентный фон */}
      <motion.div
        className="absolute inset-0"
        animate={variants.gradient}
        transition={{
          duration: heroStage === 3 ? 1.2 : 0.8,
          ease: heroStage === 3 ? [0.22, 1, 0.36, 1] : 'easeOut'
        }}
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
        animate={variants.gradient}
        transition={{
          duration: heroStage === 3 ? 1.2 : 0.8,
          ease: heroStage === 3 ? [0.22, 1, 0.36, 1] : 'easeOut'
        }}
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
        animate={variants.grid}
        transition={{
          duration: heroStage === 3 ? 1.2 : 0.8,
          ease: heroStage === 3 ? [0.22, 1, 0.36, 1] : 'easeOut'
        }}
        style={{
          backgroundImage: `
            linear-gradient(${tokens.primary}10 1px, transparent 1px),
            linear-gradient(90deg, ${tokens.primary}10 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `perspective(1000px) rotateX(${variants.grid.rotateX}deg)`,
          transformOrigin: 'center center',
        }}
      />

      {/* Дополнительная сетка для H3 эффекта */}
      {heroStage === 3 && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1.2 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            backgroundImage: `
              linear-gradient(${tokens.secondary}05 1px, transparent 1px),
              linear-gradient(90deg, ${tokens.secondary}05 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
            transform: 'perspective(1000px) rotateX(15deg)',
            transformOrigin: 'center center',
          }}
        />
      )}

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
    </div>
  );
}
