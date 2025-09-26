'use client';

import { motion } from 'framer-motion';
import { Suspense, lazy, useState, useEffect } from 'react';
import CanvasFallback from './CanvasFallback';

interface ThreeBackgroundProps {
  capabilityStage: number;
  className?: string;
}

// Lazy load Three.js компонент для производительности
const ThreeScene = lazy(() => import('./ThreeScene'));

export default function ThreeBackground({ capabilityStage, className = '' }: ThreeBackgroundProps) {
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

  // Анимации для разных этапов Capabilities
  const getThreeVariants = () => {
    switch (capabilityStage) {
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
          opacity: 0.7,
          scale: 1.1,
          rotateY: 30,
        };
      case 4:
        return {
          opacity: 0.6,
          scale: 1.08,
          rotateY: 45,
        };
      case 5:
        return {
          opacity: 0.8,
          scale: 1.12,
          rotateY: 60,
        };
      case 6:
        return {
          opacity: 0.65,
          scale: 1.06,
          rotateY: 75,
        };
      case 7:
        return {
          opacity: 1.0,
          scale: 1.2,
          rotateY: 90,
        };
      case 8:
        return {
          opacity: 0.7,
          scale: 1.1,
          rotateY: 105,
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
      <div className={`absolute inset-0 w-full h-full ${className}`}>
        <CanvasFallback capabilityStage={capabilityStage} />
      </div>
    );
  }

  return (
    <motion.div
      className={`absolute inset-0 w-full h-full ${className}`}
      animate={variants}
      transition={{
        duration: capabilityStage === 7 ? 1.2 : 0.8,
        ease: capabilityStage === 7 ? [0.22, 1, 0.36, 1] : 'easeOut'
      }}
    >
      {isWebGLSupported ? (
        <Suspense fallback={<CanvasFallback capabilityStage={capabilityStage} />}>
          <ThreeScene capabilityStage={capabilityStage} />
        </Suspense>
      ) : (
        <CanvasFallback capabilityStage={capabilityStage} />
      )}
    </motion.div>
  );
}
