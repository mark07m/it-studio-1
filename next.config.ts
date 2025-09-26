import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Отключаем оптимизацию шрифтов для Turbopack
  optimizeFonts: false,
  // Отключаем Turbopack для стабильности
  experimental: {
    turbo: {
      resolveAlias: {
        // Убираем проблемные алиасы
      },
    },
  },
};

export default nextConfig;
