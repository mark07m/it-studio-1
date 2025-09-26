'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import Capabilities3DOnly from './Capabilities3DOnly';

interface CapabilitiesBackgroundProps {
  className?: string;
}

export default function CapabilitiesBackground({ className = '' }: CapabilitiesBackgroundProps) {
  const { capabilityStage } = useAppStore();

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Только 3D куб */}
      <Capabilities3DOnly 
        capabilityStage={capabilityStage}
        className="absolute inset-0 z-0"
      />
    </div>
  );
}
