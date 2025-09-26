'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'domain' | 'tech' | 'feature';
  className?: string;
  delay?: number;
}

export default function Badge({
  children,
  variant = 'domain',
  className = '',
  delay = 0
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm';
  
  const variantClasses = {
    domain: 'bg-purple-500/20 border border-purple-400/30 text-purple-200',
    tech: 'bg-blue-500/20 border border-blue-400/30 text-blue-200',
    feature: 'bg-green-500/20 border border-green-400/30 text-green-200'
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
        delay: delay * 0.06 // 60ms stagger as specified
      }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
}
