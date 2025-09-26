'use client';

import { motion } from 'framer-motion';
import { Suspense, lazy, useState, useEffect } from 'react';
import CanvasFallback from './CanvasFallback';

interface ThreeBackgroundProps {
  heroStage: number;
  className?: string;
}

// Lazy load Three.js компонент для производительности
const ThreeScene = lazy(() => import('./ThreeScene'));

export default function ThreeBackground({ heroStage, className = '' }: ThreeBackgroundProps) {
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

  // Анимации для разных этапов Hero
  const getThreeVariants = () => {
    switch (heroStage) {
      case 1:
        return {
          opacity: 0.3,
          scale: 1,
          rotateY: 0,
        };
      case 2:
        return {
          opacity: 0.5,
          scale: 1.05,
          rotateY: 15,
        };
      case 3:
        return {
          opacity: 1.0,
          scale: 1.2,
          rotateY: 30,
        };
      case 4:
        return {
          opacity: 0.6,
          scale: 1.1,
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
        <CanvasFallback heroStage={heroStage} />
      </div>
    );
  }

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={variants}
      transition={{
        duration: heroStage === 3 ? 1.2 : 0.8,
        ease: heroStage === 3 ? [0.22, 1, 0.36, 1] : 'easeOut'
      }}
    >
      {isWebGLSupported ? (
        <Suspense fallback={<CanvasFallback heroStage={heroStage} />}>
          <ThreeScene heroStage={heroStage} />
        </Suspense>
      ) : (
        <CanvasFallback heroStage={heroStage} />
      )}
    </motion.div>
  );
}