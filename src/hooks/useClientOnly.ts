import { useState, useEffect } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

// Хук для безопасной работы с клиентскими значениями
export const useClientOnly = <T>(clientValue: T, serverValue: T): T => {
  const [value, setValue] = useState(serverValue);

  useEffect(() => {
    setValue(clientValue);
  }, [clientValue]);

  return value;
};

// Хук для проверки, что мы на клиенте (стабильная версия)
export const useIsClient = (): boolean => {
  const [isClient, setIsClient] = useState(false);

  // Используем useIsomorphicLayoutEffect для синхронного обновления
  useIsomorphicLayoutEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

// Альтернативный хук с фиксированным массивом зависимостей
export const useIsClientStable = (): boolean => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []); // Пустой массив зависимостей - выполняется только один раз

  return isClient;
};
