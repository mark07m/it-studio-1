'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import Hero3DOnly from './Hero3DOnly';

interface HeroBackgroundProps {
  className?: string;
}

export default function HeroBackground({ className = '' }: HeroBackgroundProps) {
  const { heroStage } = useAppStore();

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Только 3D сфера */}
      <Hero3DOnly 
        heroStage={heroStage}
        className="absolute inset-0 z-10"
      />
    </div>
  );
}
