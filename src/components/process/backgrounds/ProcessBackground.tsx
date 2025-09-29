'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import Process3DOnly from './Process3DOnly';

interface ProcessBackgroundProps {
  className?: string;
}

export default function ProcessBackground({ className = '' }: ProcessBackgroundProps) {
  const { processStage } = useAppStore();

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Только 3D элементы для Process */}
      <Process3DOnly 
        processStage={processStage}
        className="absolute inset-0 z-0"
      />
    </div>
  );
}
