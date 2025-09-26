'use client'

import { motion } from 'framer-motion';
import { Suspense, lazy, useState, useEffect } from 'react';
import { useAppStore } from '@/store/appStore';
import CanvasFallback from './CanvasFallback';

interface PortfolioBackgroundProps {
  className?: string
}

// Lazy load Three.js компонент для производительности
const ThreeScene = lazy(() => import('./ThreeScene'));

export default function PortfolioBackground({ className = '' }: PortfolioBackgroundProps) {
  const { portfolioStage, currentSkin } = useAppStore()
  const [isWebGLSupported, setIsWebGLSupported] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Проверяем поддержку WebGL
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setIsWebGLSupported(!!gl);

    // Небольшая задержка для плавной загрузки
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Анимации для разных этапов Portfolio
  const getThreeVariants = () => {
    switch (portfolioStage) {
      case 1: // FinTech
        return {
          opacity: 0.3,
          scale: 1,
          rotateY: 0,
        };
      case 2: // E-commerce
        return {
          opacity: 0.5,
          scale: 1.05,
          rotateY: 15,
        };
      case 3: // HealthTech
        return {
          opacity: 0.7,
          scale: 1.1,
          rotateY: 30,
        };
      case 4: // AI Platform
        return {
          opacity: 0.8,
          scale: 1.15,
          rotateY: 45,
        };
      default:
        return {
          opacity: 0.3,
          scale: 1,
          rotateY: 0,
        };
    }
  };

  const variants = getThreeVariants();

  if (!isLoaded) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <CanvasFallback portfolioStage={portfolioStage} />
      </div>
    );
  }

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={variants}
      transition={{
        duration: portfolioStage === 4 ? 1.2 : 0.8,
        ease: portfolioStage === 4 ? [0.22, 1, 0.36, 1] : 'easeOut'
      }}
    >
      {isWebGLSupported ? (
        <Suspense fallback={<CanvasFallback portfolioStage={portfolioStage} />}>
          <ThreeScene portfolioStage={portfolioStage} />
        </Suspense>
      ) : (
        <CanvasFallback portfolioStage={portfolioStage} />
      )}
    </motion.div>
  );
}
