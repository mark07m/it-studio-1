'use client';

import { motion } from 'framer-motion';
import { Suspense, lazy, useState, useEffect } from 'react';
import CanvasFallback from './CanvasFallback';

interface Capabilities3DOnlyProps {
  capabilityStage: number;
  className?: string;
}

// Lazy load Three.js компонент для производительности
const ThreeScene = lazy(() => import('./ThreeScene'));

export default function Capabilities3DOnly({ capabilityStage, className = '' }: Capabilities3DOnlyProps) {
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

  // Анимации для разных этапов Capabilities - только opacity, без scale
  const getThreeVariants = () => {
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
        duration: 0.8,
        ease: 'easeOut'
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
