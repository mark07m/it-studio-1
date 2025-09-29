'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, TrendingUp, Gauge, BarChart3, Activity, DollarSign, Target, Zap, X, Info, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

const ProcessStage5 = () => {
  const { currentSkin, prefersReducedMotion } = useAppStore()
  const [isRocketFlying, setIsRocketFlying] = useState(false)
  const [isScaling, setIsScaling] = useState(false)
  const [isAutoScaling, setIsAutoScaling] = useState(false)
  const [isABTesting, setIsABTesting] = useState(false)
  const [isFinOps, setIsFinOps] = useState(false)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  
  const rocketTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const scalingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Микро-анимация взлёта для иконки 🚀
  useEffect(() => {
    const startRocketFlight = () => {
      if (prefersReducedMotion) return
      
      setIsRocketFlying(true)
      
      if (rocketTimeoutRef.current) {
        clearTimeout(rocketTimeoutRef.current)
      }
      
      rocketTimeoutRef.current = setTimeout(() => {
        setIsRocketFlying(false)
      }, 1000)
    }

    startRocketFlight()
    const interval = setInterval(startRocketFlight, 5000)

    return () => {
      clearInterval(interval)
      if (rocketTimeoutRef.current) {
        clearTimeout(rocketTimeoutRef.current)
      }
    }
  }, [prefersReducedMotion])


  // Анимация масштабирования системы
  useEffect(() => {
    const startScaling = () => {
      if (prefersReducedMotion) return
      
      setIsScaling(true)
      
      setTimeout(() => {
        setIsAutoScaling(true)
      }, 1000)
      
      setTimeout(() => {
        setIsAutoScaling(false)
        setIsScaling(false)
      }, 3000)
    }

    startScaling()
    const interval = setInterval(startScaling, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [prefersReducedMotion])

  // Анимация A/B тестирования
  useEffect(() => {
    const startABTesting = () => {
      if (prefersReducedMotion) return
      
      setIsABTesting(true)
      
      setTimeout(() => {
        setIsABTesting(false)
      }, 2000)
    }

    startABTesting()
    const interval = setInterval(startABTesting, 12000)

    return () => {
      clearInterval(interval)
    }
  }, [prefersReducedMotion])

  // Анимация FinOps
  useEffect(() => {
    const startFinOps = () => {
      if (prefersReducedMotion) return
      
      setIsFinOps(true)
      
      setTimeout(() => {
        setIsFinOps(false)
      }, 1500)
    }

    startFinOps()
    const interval = setInterval(startFinOps, 15000)

    return () => {
      clearInterval(interval)
    }
  }, [prefersReducedMotion])


  const content = {
    title: "Scale & Grow",
    subtitle: "Масштабируем до IPO, оптимизируем каждую метрику",
    trust: {
      experience: "99.9% uptime",
      success: "200% рост",
      expertise: "Эксперты по масштабированию"
    },
    process: [
      "Автоскейлинг/кэш/кластеры/шардинг",
      "Наблюдаемость: логи, метрики, трассировки", 
      "A/B тесты и продуктовая аналитика",
      "Оптимизация затрат (FinOps)"
    ],
    deliverables: [
      "Scaling Playbook",
      "Набор дашбордов (продакшн/бизнес)",
      "План роста на квартал"
    ],
    timeline: "Непрерывно после релизов",
    guarantee: "Гарантируем стабильный рост без технического долга"
  }

  const modalContent = {
    scaling: {
      title: "Масштабирование системы",
      content: [
        "• Автоматическое масштабирование под нагрузкой",
        "• Кэширование на всех уровнях (Redis, CDN)",
        "• Горизонтальное масштабирование серверов",
        "• Шардинг базы данных",
        "• Load balancing и failover"
      ]
    },
    observability: {
      title: "Наблюдаемость",
      content: [
        "• Централизованное логирование (ELK Stack)",
        "• Метрики в реальном времени (Prometheus)",
        "• Трассировка запросов (Jaeger)",
        "• Алерты и мониторинг SLO",
        "• Дашборды для команды и бизнеса"
      ]
    },
    abtesting: {
      title: "A/B тестирование",
      content: [
        "• Инфраструктура для A/B тестов",
        "• Статистическая значимость результатов",
        "• Сегментация пользователей",
        "• Аналитика конверсии и удержания",
        "• Автоматическое внедрение победителей"
      ]
    },
    finops: {
      title: "FinOps (Оптимизация затрат)",
      content: [
        "• Мониторинг затрат на облако",
        "• Оптимизация ресурсов по времени",
        "• Reserved instances и spot instances",
        "• Автоматическое масштабирование вниз",
        "• Отчёты по ROI и эффективности"
      ]
    }
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
      {/* Glass карточка */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        className={`relative max-w-6xl w-full ${
          currentSkin === 'neonGlass' 
            ? 'bg-white/10 backdrop-blur-md border border-cyan-400/30 shadow-2xl shadow-cyan-400/20'
            : currentSkin === 'warmGlow'
            ? 'bg-white/10 backdrop-blur-md border border-orange-400/30 shadow-2xl shadow-orange-400/20'
            : 'bg-white/10 backdrop-blur-md border border-gray-400/30 shadow-2xl shadow-gray-400/20'
        } rounded-2xl p-3 sm:p-4`}
      >
        {/* Заголовок с иконкой и доверием */}
        <div className="text-center mb-4">
          <motion.div
            className="inline-flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-gradient-to-br from-green-400 to-blue-500"
            animate={isRocketFlying ? {
              y: [0, -8, 0],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Rocket 
              className={`w-5 h-5 ${
                currentSkin === 'neonGlass' 
                  ? 'text-green-100'
                  : currentSkin === 'warmGlow'
                  ? 'text-orange-100'
                  : 'text-gray-100'
              }`}
            />
          </motion.div>
          
          <motion.h1 
            className={`text-xl sm:text-2xl font-bold mb-1 ${
              currentSkin === 'neonGlass' 
                ? 'text-green-400'
                : currentSkin === 'warmGlow'
                ? 'text-orange-400'
                : 'text-gray-400'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {content.title}
          </motion.h1>
          
          <motion.p 
            className="text-xs sm:text-sm text-white/80 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {content.subtitle}
          </motion.p>

          {/* Trust indicators */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className={`px-2 py-1 rounded-full ${
              currentSkin === 'neonGlass' 
                ? 'bg-green-500/20 text-green-300'
                : currentSkin === 'warmGlow'
                ? 'bg-orange-500/20 text-orange-300'
                : 'bg-gray-500/20 text-gray-300'
            }`}>
              {content.trust.experience}
            </div>
            <div className={`px-2 py-1 rounded-full ${
              currentSkin === 'neonGlass' 
                ? 'bg-blue-500/20 text-blue-300'
                : currentSkin === 'warmGlow'
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-gray-500/20 text-gray-300'
            }`}>
              {content.trust.success}
            </div>
            <div className={`px-2 py-1 rounded-full ${
              currentSkin === 'neonGlass' 
                ? 'bg-purple-500/20 text-purple-300'
                : currentSkin === 'warmGlow'
                ? 'bg-red-500/20 text-red-300'
                : 'bg-gray-500/20 text-gray-300'
            }`}>
              {content.trust.expertise}
            </div>
          </motion.div>
        </div>

        {/* Интерактивные элементы для демонстрации масштабирования */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {/* Масштабирование */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 relative ${
              isScaling 
                ? currentSkin === 'neonGlass' 
                  ? 'bg-green-500/20 border border-green-400/40'
                  : currentSkin === 'warmGlow'
                  ? 'bg-orange-500/20 border border-orange-400/40'
                  : 'bg-gray-500/20 border border-gray-400/40'
                : currentSkin === 'neonGlass' 
                ? 'bg-green-500/10 border border-green-400/20 hover:bg-green-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-orange-500/10 border border-orange-400/20 hover:bg-orange-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
            onClick={() => setActiveModal('scaling')}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <motion.div
                  animate={isScaling ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isScaling ? Infinity : 0 }}
                >
                  <TrendingUp className={`w-3 h-3 mr-2 ${
                    currentSkin === 'neonGlass' 
                      ? 'text-green-400'
                      : currentSkin === 'warmGlow'
                      ? 'text-orange-400'
                      : 'text-gray-400'
                  }`} />
                </motion.div>
                <h3 className={`text-xs font-semibold ${
                  currentSkin === 'neonGlass' 
                    ? 'text-green-300'
                    : currentSkin === 'warmGlow'
                    ? 'text-orange-300'
                    : 'text-gray-300'
                }`}>
                  Масштабирование
                </h3>
              </div>
              <Info className="w-3 h-3 text-white/60" />
            </div>
            <p className="text-xs text-white/80">
              {isScaling ? 'Масштабируем...' : 'Автоскейлинг, кэш'}
            </p>
          </motion.div>

          {/* Наблюдаемость */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 relative ${
              currentSkin === 'neonGlass' 
                ? 'bg-blue-500/10 border border-blue-400/20 hover:bg-blue-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-cyan-500/10 border border-cyan-400/20 hover:bg-cyan-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
            onClick={() => setActiveModal('observability')}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Activity className={`w-3 h-3 mr-2 ${
                  currentSkin === 'neonGlass' 
                    ? 'text-blue-400'
                    : currentSkin === 'warmGlow'
                    ? 'text-cyan-400'
                    : 'text-gray-400'
                }`} />
                <h3 className={`text-xs font-semibold ${
                  currentSkin === 'neonGlass' 
                    ? 'text-blue-300'
                    : currentSkin === 'warmGlow'
                    ? 'text-cyan-300'
                    : 'text-gray-300'
                }`}>
                  Наблюдаемость
                </h3>
              </div>
              <Info className="w-3 h-3 text-white/60" />
            </div>
            <p className="text-xs text-white/80">
              Логи, метрики, алерты
            </p>
          </motion.div>

          {/* A/B тестирование */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 relative ${
              isABTesting 
                ? currentSkin === 'neonGlass' 
                  ? 'bg-purple-500/20 border border-purple-400/40'
                  : currentSkin === 'warmGlow'
                  ? 'bg-red-500/20 border border-red-400/40'
                  : 'bg-gray-500/20 border border-gray-400/40'
                : currentSkin === 'neonGlass' 
                ? 'bg-purple-500/10 border border-purple-400/20 hover:bg-purple-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-red-500/10 border border-red-400/20 hover:bg-red-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
            onClick={() => setActiveModal('abtesting')}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <motion.div
                  animate={isABTesting ? { x: [0, 2, -2, 0] } : {}}
                  transition={{ duration: 0.3, repeat: isABTesting ? Infinity : 0 }}
                >
                  <Target className={`w-3 h-3 mr-2 ${
                    currentSkin === 'neonGlass' 
                      ? 'text-purple-400'
                      : currentSkin === 'warmGlow'
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`} />
                </motion.div>
                <h3 className={`text-xs font-semibold ${
                  currentSkin === 'neonGlass' 
                    ? 'text-purple-300'
                    : currentSkin === 'warmGlow'
                    ? 'text-red-300'
                    : 'text-gray-300'
                }`}>
                  A/B тесты
                </h3>
              </div>
              <Info className="w-3 h-3 text-white/60" />
            </div>
            <p className="text-xs text-white/80">
              {isABTesting ? 'Тестируем...' : 'Аналитика, конверсия'}
            </p>
          </motion.div>

          {/* FinOps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 relative ${
              isFinOps 
                ? currentSkin === 'neonGlass' 
                  ? 'bg-yellow-500/20 border border-yellow-400/40'
                  : currentSkin === 'warmGlow'
                  ? 'bg-amber-500/20 border border-amber-400/40'
                  : 'bg-gray-500/20 border border-gray-400/40'
                : currentSkin === 'neonGlass' 
                ? 'bg-yellow-500/10 border border-yellow-400/20 hover:bg-yellow-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-amber-500/10 border border-amber-400/20 hover:bg-amber-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
            onClick={() => setActiveModal('finops')}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <motion.div
                  animate={isFinOps ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.4, repeat: isFinOps ? Infinity : 0 }}
                >
                  <DollarSign className={`w-3 h-3 mr-2 ${
                    currentSkin === 'neonGlass' 
                      ? 'text-yellow-400'
                      : currentSkin === 'warmGlow'
                      ? 'text-amber-400'
                      : 'text-gray-400'
                  }`} />
                </motion.div>
                <h3 className={`text-xs font-semibold ${
                  currentSkin === 'neonGlass' 
                    ? 'text-yellow-300'
                    : currentSkin === 'warmGlow'
                    ? 'text-amber-300'
                    : 'text-gray-300'
                }`}>
                  FinOps
                </h3>
              </div>
              <Info className="w-3 h-3 text-white/60" />
            </div>
            <p className="text-xs text-white/80">
              {isFinOps ? 'Оптимизируем...' : 'Стоимость, ROI'}
            </p>
          </motion.div>
        </div>


        {/* Основной контент */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Процесс */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`p-3 rounded-lg ${
              currentSkin === 'neonGlass' 
                ? 'bg-green-500/10 border border-green-400/20'
                : currentSkin === 'warmGlow'
                ? 'bg-orange-500/10 border border-orange-400/20'
                : 'bg-gray-500/10 border border-gray-400/20'
            }`}
          >
            <h3 className={`text-xs font-semibold mb-2 ${
              currentSkin === 'neonGlass' 
                ? 'text-green-300'
                : currentSkin === 'warmGlow'
                ? 'text-orange-300'
                : 'text-gray-300'
            }`}>
              Как это работает
            </h3>
            <ul className="space-y-1">
              {content.process.map((item, itemIndex) => (
                <motion.li
                  key={itemIndex}
                  className="flex items-start text-xs"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + itemIndex * 0.05, duration: 0.3 }}
                >
                  <span className={`mr-1 mt-1 ${
                    currentSkin === 'neonGlass' 
                      ? 'text-green-400'
                      : currentSkin === 'warmGlow'
                      ? 'text-orange-400'
                      : 'text-gray-400'
                  }`}>•</span>
                  <span className="text-white/90">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Результаты */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className={`p-3 rounded-lg ${
              currentSkin === 'neonGlass' 
                ? 'bg-blue-500/10 border border-blue-400/20'
                : currentSkin === 'warmGlow'
                ? 'bg-cyan-500/10 border border-cyan-400/20'
                : 'bg-gray-500/10 border border-gray-400/20'
            }`}
          >
            <h3 className={`text-xs font-semibold mb-2 ${
              currentSkin === 'neonGlass' 
                ? 'text-blue-300'
                : currentSkin === 'warmGlow'
                ? 'text-cyan-300'
                : 'text-gray-300'
            }`}>
              Что вы получаете
            </h3>
            <ul className="space-y-1">
              {content.deliverables.map((item, itemIndex) => (
                <motion.li
                  key={itemIndex}
                  className="flex items-start text-xs"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + itemIndex * 0.05, duration: 0.3 }}
                >
                  <span className={`mr-1 mt-1 ${
                    currentSkin === 'neonGlass' 
                      ? 'text-green-400'
                      : currentSkin === 'warmGlow'
                      ? 'text-orange-400'
                      : 'text-gray-400'
                  }`}>•</span>
                  <span className="text-white/90">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Время и гарантия */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className={`p-3 rounded-lg ${
              currentSkin === 'neonGlass' 
                ? 'bg-purple-500/10 border border-purple-400/20'
                : currentSkin === 'warmGlow'
                ? 'bg-red-500/10 border border-red-400/20'
                : 'bg-gray-500/10 border border-gray-400/20'
            }`}
          >
            <h3 className={`text-xs font-semibold mb-2 ${
              currentSkin === 'neonGlass' 
                ? 'text-purple-300'
                : currentSkin === 'warmGlow'
                ? 'text-red-300'
                : 'text-gray-300'
            }`}>
              Ритм и гарантия
            </h3>
            <div className="space-y-2">
              <motion.div
                className={`text-xs px-2 py-1 rounded-full inline-block ${
                  currentSkin === 'neonGlass' 
                    ? 'bg-green-500/20 text-green-300'
                    : currentSkin === 'warmGlow'
                    ? 'bg-orange-500/20 text-orange-300'
                    : 'bg-gray-500/20 text-gray-300'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                {content.timeline}
              </motion.div>
              <p className="text-xs text-white/80 leading-relaxed">
                {content.guarantee}
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA кнопки */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-2 mt-4 pt-3 border-t border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-300 ${
            currentSkin === 'neonGlass' 
              ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25'
              : currentSkin === 'warmGlow'
              ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25'
              : 'bg-gray-500 hover:bg-gray-600 text-white shadow-lg shadow-gray-500/25'
          }`}>
            Задать вопрос
          </button>
          <button className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-300 border ${
            currentSkin === 'neonGlass' 
              ? 'border-green-400 text-green-400 hover:bg-green-400/10'
              : currentSkin === 'warmGlow'
              ? 'border-orange-400 text-orange-400 hover:bg-orange-400/10'
              : 'border-gray-400 text-gray-400 hover:bg-gray-400/10'
          }`}>
            Обсудить проект
          </button>
        </motion.div>
      </motion.div>

      {/* Модальные окна */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative max-w-md w-full ${
                currentSkin === 'neonGlass' 
                  ? 'bg-white/10 backdrop-blur-md border border-cyan-400/30 shadow-2xl shadow-cyan-400/20'
                  : currentSkin === 'warmGlow'
                  ? 'bg-white/10 backdrop-blur-md border border-orange-400/30 shadow-2xl shadow-orange-400/20'
                  : 'bg-white/10 backdrop-blur-md border border-gray-400/30 shadow-2xl shadow-gray-400/20'
              } rounded-2xl p-6`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${
                  currentSkin === 'neonGlass' 
                    ? 'text-cyan-400'
                    : currentSkin === 'warmGlow'
                    ? 'text-orange-400'
                    : 'text-gray-400'
                }`}>
                  {modalContent[activeModal as keyof typeof modalContent]?.title}
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className={`p-1 rounded-full hover:bg-white/10 transition-colors ${
                    currentSkin === 'neonGlass' 
                      ? 'text-cyan-400'
                      : currentSkin === 'warmGlow'
                      ? 'text-orange-400'
                      : 'text-gray-400'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2">
                {modalContent[activeModal as keyof typeof modalContent]?.content.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-sm text-white/90"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProcessStage5