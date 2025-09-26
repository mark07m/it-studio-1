'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import BaseBackground from './BaseBackground';
import DecorBackground from './DecorBackground';
import ThreeBackground from './ThreeBackground';

interface HeroBackgroundProps {
  className?: string;
}

export default function HeroBackground({ className = '' }: HeroBackgroundProps) {
  const { heroStage } = useAppStore();

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* BG-base слой - градиент + цифровая сетка */}
      <BaseBackground 
        heroStage={heroStage}
        className="absolute inset-0 z-0"
      />
      
      {/* BG-3D слой - Three.js сцена */}
      <ThreeBackground 
        heroStage={heroStage}
        className="absolute inset-0 z-10"
      />
      
      {/* Decor слой - неон-точки/лучи */}
      <DecorBackground 
        heroStage={heroStage}
        className="absolute inset-0 z-20"
      />
    </div>
  );
}
