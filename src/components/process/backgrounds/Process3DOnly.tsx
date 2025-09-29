'use client';

import { motion } from 'framer-motion';
import { Suspense, lazy, useState, useEffect } from 'react';
import CanvasFallback from './CanvasFallback';

interface Process3DOnlyProps {
  processStage: number;
  className?: string;
}

// Lazy load Three.js компонент для производительности
const ThreeScene = lazy(() => import('./ThreeScene'));

export default function Process3DOnly({ processStage, className = '' }: Process3DOnlyProps) {
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

  // Анимации для разных этапов Process
  const getThreeVariants = () => {
    switch (processStage) {
      case 1: // Deep Dive
        return {
          opacity: 0.3,
          scale: 1,
          rotateY: 0,
        };
      case 2: // Product Vision
        return {
          opacity: 0.5,
          scale: 1.05,
          rotateY: 15,
        };
      case 3: // System Design
        return {
          opacity: 0.7,
          scale: 1.1,
          rotateY: 30,
        };
      case 4: // Code & Ship
        return {
          opacity: 0.8,
          scale: 1.15,
          rotateY: 45,
        };
      case 5: // Scale & Grow
        return {
          opacity: 0.9,
          scale: 1.2,
          rotateY: 60,
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
        <CanvasFallback processStage={processStage} />
      </div>
    );
  }

  return (
    <motion.div
      className={`absolute inset-0 w-full h-full ${className}`}
      animate={variants}
      transition={{
        duration: processStage === 5 ? 1.2 : 0.8,
        ease: processStage === 5 ? [0.22, 1, 0.36, 1] : 'easeOut'
      }}
    >
      {isWebGLSupported ? (
        <Suspense fallback={<CanvasFallback processStage={processStage} />}>
          <ThreeScene processStage={processStage} />
        </Suspense>
      ) : (
        <CanvasFallback processStage={processStage} />
      )}
    </motion.div>
  );
}
