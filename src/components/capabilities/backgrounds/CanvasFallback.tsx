'use client';

import { motion } from 'framer-motion';
import { useSkin } from '@/hooks/useSkin';

interface CanvasFallbackProps {
  capabilityStage: number;
}

export default function CanvasFallback({ capabilityStage }: CanvasFallbackProps) {
  const { tokens } = useSkin();

  // Анимации для разных этапов Capabilities - только opacity
  const getFallbackVariants = () => {
    switch (capabilityStage) {
      case 1:
        return {
          opacity: 0.3,
        };
      case 2:
        return {
          opacity: 0.5,
        };
      case 3:
        return {
          opacity: 0.7,
        };
      case 4:
        return {
          opacity: 0.6,
        };
      case 5:
        return {
          opacity: 0.8,
        };
      case 6:
        return {
          opacity: 0.65,
        };
      case 7:
        return {
          opacity: 0.8,
        };
      case 8:
        return {
          opacity: 0.7,
        };
      default:
        return {
          opacity: 0.3,
        };
    }
  };

  // Получаем угол поворота для CSS transform
  const getRotationAngle = () => {
    switch (capabilityStage) {
      case 1: return 0;
      case 2: return 15;
      case 3: return 30;
      case 4: return 45;
      case 5: return 60;
      case 6: return 75;
      case 7: return 90;
      case 8: return 105;
      default: return 0;
    }
  };

  const variants = getFallbackVariants();

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={variants}
      transition={{
        duration: 0.8,
        ease: 'easeOut'
      }}
    >
      {/* CSS-куб как fallback - статичный размер */}
      <div className="relative w-32 h-32" style={{ transform: `rotate(${getRotationAngle()}deg)` }}>
        <div
          className="absolute inset-0 border-2 border-dashed"
          style={{
            borderColor: tokens.primary + '40',
            transform: 'rotateX(45deg) rotateY(45deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Передняя грань */}
          <div
            className="absolute inset-0 border-2"
            style={{
              borderColor: tokens.primary + '60',
              transform: 'translateZ(32px)',
            }}
          />
          {/* Задняя грань */}
          <div
            className="absolute inset-0 border-2"
            style={{
              borderColor: tokens.primary + '20',
              transform: 'translateZ(-32px)',
            }}
          />
          {/* Левая грань */}
          <div
            className="absolute inset-0 border-2"
            style={{
              borderColor: tokens.primary + '40',
              transform: 'rotateY(-90deg) translateZ(32px)',
            }}
          />
          {/* Правая грань */}
          <div
            className="absolute inset-0 border-2"
            style={{
              borderColor: tokens.primary + '40',
              transform: 'rotateY(90deg) translateZ(32px)',
            }}
          />
          {/* Верхняя грань */}
          <div
            className="absolute inset-0 border-2"
            style={{
              borderColor: tokens.primary + '30',
              transform: 'rotateX(90deg) translateZ(32px)',
            }}
          />
          {/* Нижняя грань */}
          <div
            className="absolute inset-0 border-2"
            style={{
              borderColor: tokens.primary + '30',
              transform: 'rotateX(-90deg) translateZ(32px)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
