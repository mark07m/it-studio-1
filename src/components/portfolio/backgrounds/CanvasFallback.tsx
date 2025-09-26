'use client';

import { motion } from 'framer-motion';

interface CanvasFallbackProps {
  portfolioStage: number;
}

export default function CanvasFallback({ portfolioStage }: CanvasFallbackProps) {
  // Анимации для разных этапов Portfolio
  const getFallbackVariants = () => {
    switch (portfolioStage) {
      case 1: // FinTech
        return {
          opacity: 0.3,
          scale: 1,
          rotate: 0,
        };
      case 2: // E-commerce
        return {
          opacity: 0.5,
          scale: 1.05,
          rotate: 15,
        };
      case 3: // HealthTech
        return {
          opacity: 0.7,
          scale: 1.1,
          rotate: 30,
        };
      case 4: // AI Platform
        return {
          opacity: 0.8,
          scale: 1.15,
          rotate: 45,
        };
      default:
        return {
          opacity: 0.3,
          scale: 1,
          rotate: 0,
        };
    }
  };

  const variants = getFallbackVariants();

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative"
        animate={variants}
        transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}
      >
        {/* SVG звезда как fallback */}
        <div className="relative">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="text-purple-400/30"
          >
          <defs>
            <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>
          
          {/* 5-конечная звезда */}
          <path
            d="M100 20 L120 80 L180 80 L130 120 L150 180 L100 140 L50 180 L70 120 L20 80 L80 80 Z"
            fill="none"
            stroke="url(#starGradient)"
            strokeWidth="2"
            strokeOpacity="0.4"
          />
          
          {/* Внутренняя звезда */}
          <path
            d="M100 40 L110 80 L150 80 L120 110 L130 150 L100 120 L70 150 L80 110 L50 80 L90 80 Z"
            fill="none"
            stroke="url(#starGradient)"
            strokeWidth="1"
            strokeOpacity="0.2"
          />
          </svg>
          
          {/* Декоративные точки вокруг звезды */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const radius = 90;
            const x = 100 + Math.cos(angle) * radius;
            const y = 100 + Math.sin(angle) * radius;
            
            return (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  left: x - 3,
                  top: y - 3,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: '#8B5CF6',
                  opacity: 0.3,
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
