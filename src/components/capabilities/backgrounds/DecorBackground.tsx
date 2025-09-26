'use client';

import { motion } from 'framer-motion';
import { useSkin } from '@/hooks/useSkin';

interface DecorBackgroundProps {
  capabilityStage: number;
  className?: string;
}

export default function DecorBackground({ capabilityStage, className = '' }: DecorBackgroundProps) {
  const { tokens } = useSkin();

  // Анимации для разных этапов Capabilities
  const getDecorVariants = () => {
    switch (capabilityStage) {
      case 1:
        return {
          opacity: 0.4,
          scale: 1,
          rotate: 0,
        };
      case 2:
        return {
          opacity: 0.6,
          scale: 1.05,
          rotate: 5,
        };
      case 3:
        return {
          opacity: 0.8,
          scale: 1.1,
          rotate: 10,
        };
      case 4:
        return {
          opacity: 0.7,
          scale: 1.08,
          rotate: 15,
        };
      case 5:
        return {
          opacity: 0.9,
          scale: 1.12,
          rotate: 20,
        };
      case 6:
        return {
          opacity: 0.75,
          scale: 1.06,
          rotate: 25,
        };
      case 7:
        return {
          opacity: 1.0,
          scale: 1.2,
          rotate: 30,
        };
      case 8:
        return {
          opacity: 0.8,
          scale: 1.1,
          rotate: 35,
        };
      default:
        return {
          opacity: 0.4,
          scale: 1,
          rotate: 0,
        };
    }
  };

  const variants = getDecorVariants();

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      {/* Неон-точки */}
      <motion.div
        className="absolute inset-0"
        animate={variants}
        transition={{
          duration: capabilityStage === 7 ? 1.2 : 0.8,
          ease: capabilityStage === 7 ? [0.22, 1, 0.36, 1] : 'easeOut'
        }}
      >
        {/* Случайные точки */}
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: tokens.primary,
              boxShadow: `0 0 10px ${tokens.primary}`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Лучи света */}
      <motion.div
        className="absolute inset-0"
        animate={variants}
        transition={{
          duration: capabilityStage === 7 ? 1.2 : 0.8,
          ease: capabilityStage === 7 ? [0.22, 1, 0.36, 1] : 'easeOut'
        }}
      >
        {/* Вертикальные лучи */}
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={`vertical-${i}`}
            className="absolute w-px h-full"
            style={{
              left: `${20 + i * 30}%`,
              background: `linear-gradient(to bottom, transparent, ${tokens.primary}40, transparent)`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Горизонтальные лучи */}
        {Array.from({ length: 2 }, (_, i) => (
          <motion.div
            key={`horizontal-${i}`}
            className="absolute w-full h-px"
            style={{
              top: `${30 + i * 40}%`,
              background: `linear-gradient(to right, transparent, ${tokens.primary}40, transparent)`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </motion.div>

      {/* Центральный эффект для C7 */}
      {capabilityStage === 7 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="w-64 h-64 rounded-full border-2 border-dashed"
            style={{
              borderColor: tokens.primary + '60',
              boxShadow: `0 0 50px ${tokens.primary}40`,
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
