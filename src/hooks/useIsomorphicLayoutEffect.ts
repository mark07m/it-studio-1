import { useEffect, useLayoutEffect } from 'react';

// Хук для безопасного использования useLayoutEffect в SSR
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Альтернативная версия с проверкой на клиенте
export const useIsomorphicLayoutEffectSafe = (effect: React.EffectCallback, deps?: React.DependencyList) => {
  if (typeof window !== 'undefined') {
    return useLayoutEffect(effect, deps);
  } else {
    return useEffect(effect, deps);
  }
};
