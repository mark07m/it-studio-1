'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Boxes, Server, Database, Cpu, Network, Shield, Zap, ArrowRight } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

const ProcessStage3 = () => {
  const { currentSkin, prefersReducedMotion } = useAppStore()
  const [isBuilding, setIsBuilding] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  
  const buildTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const connectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Микро-анимация сборки схемы из блоков
  useEffect(() => {
    const startBuilding = () => {
      if (prefersReducedMotion) return
      
      setIsBuilding(true)
      
      // Очищаем предыдущие таймауты
      if (buildTimeoutRef.current) {
        clearTimeout(buildTimeoutRef.current)
      }
      if (connectTimeoutRef.current) {
        clearTimeout(connectTimeoutRef.current)
      }
      
      // Завершаем сборку через 800мс
      buildTimeoutRef.current = setTimeout(() => {
        setIsBuilding(false)
        // Запускаем анимацию соединений
        setIsConnecting(true)
        connectTimeoutRef.current = setTimeout(() => {
          setIsConnecting(false)
        }, 1000)
      }, 800)
    }

    // Запускаем анимацию при монтировании
    startBuilding()

    // Повторяем каждые 6 секунд
    const interval = setInterval(startBuilding, 6000)

    return () => {
      clearInterval(interval)
      if (buildTimeoutRef.current) {
        clearTimeout(buildTimeoutRef.current)
      }
      if (connectTimeoutRef.current) {
        clearTimeout(connectTimeoutRef.current)
      }
    }
  }, [prefersReducedMotion])

  const content = {
    title: "System Design",
    subtitle: "Архитектура, которая выдержит миллионы пользователей",
    trust: {
      experience: "200+ систем",
      success: "99.9% uptime",
      expertise: "Эксперты по масштабированию"
    },
    process: [
      "C4-модель диаграммы",
      "Источники истины данных", 
      "NFR: производительность, безопасность",
      "Выбор стека и ADR"
    ],
    deliverables: [
      "System Design Doc + ADR",
      "Профиль нагрузок и SLO",
      "План запуска и мониторинг"
    ],
    timeline: "7–14 рабочих дней",
    guarantee: "Гарантируем масштабируемую архитектуру"
  }

  const modalContent = {
    nfr: {
      title: "NFR Требования",
      icon: Shield,
      items: [
        { label: "Производительность", value: "99.9% uptime", color: "green" },
        { label: "Безопасность", value: "GDPR, HIPAA", color: "red" },
        { label: "Стоимость", value: "оптимизация ресурсов", color: "yellow" }
      ]
    },
    techStack: {
      title: "Выбор стека технологий",
      icon: Zap,
      items: [
        { label: "Frontend", value: "React + TypeScript + Tailwind" },
        { label: "Backend", value: "Node.js + Express + Prisma" },
        { label: "Database", value: "PostgreSQL + Redis" },
        { label: "Infrastructure", value: "AWS + Docker + K8s" }
      ]
    },
    migration: {
      title: "План миграций",
      icon: ArrowRight,
      items: [
        { label: "Фаза 1", value: "Подготовка инфраструктуры", color: "green" },
        { label: "Фаза 2", value: "Миграция данных", color: "yellow" },
        { label: "Фаза 3", value: "Тестирование и запуск", color: "blue" }
      ]
    }
  }

  // Анимация блоков для сборки схемы
  const blockVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -10 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6">
      {/* Glass карточка */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        className={`relative max-w-7xl w-full ${
          currentSkin === 'neonGlass' 
            ? 'bg-white/10 backdrop-blur-md border border-cyan-400/30 shadow-2xl shadow-cyan-400/20'
            : currentSkin === 'warmGlow'
            ? 'bg-white/10 backdrop-blur-md border border-orange-400/30 shadow-2xl shadow-orange-400/20'
            : 'bg-white/10 backdrop-blur-md border border-gray-400/30 shadow-2xl shadow-gray-400/20'
        } rounded-2xl p-4 sm:p-6`}
      >
        {/* Компактный заголовок с иконкой */}
        <div className="text-center mb-4">
          <motion.div
            className="relative inline-flex items-center justify-center w-10 h-10 mb-2"
            animate={isBuilding ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Схема из блоков */}
            {isBuilding && (
              <>
                <motion.div
                  className={`absolute w-6 h-6 rounded-lg ${
                    currentSkin === 'neonGlass' 
                      ? 'bg-cyan-400/20 border border-cyan-400'
                      : currentSkin === 'warmGlow'
                      ? 'bg-orange-400/20 border border-orange-400'
                      : 'bg-gray-400/20 border border-gray-400'
                  }`}
                  variants={blockVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                />
                <motion.div
                  className={`absolute w-4 h-4 rounded-lg ${
                    currentSkin === 'neonGlass' 
                      ? 'bg-green-400/20 border border-green-400'
                      : currentSkin === 'warmGlow'
                      ? 'bg-emerald-400/20 border border-emerald-400'
                      : 'bg-gray-400/20 border border-gray-400'
                  }`}
                  variants={blockVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                />
                <motion.div
                  className={`absolute w-3 h-3 rounded-lg ${
                    currentSkin === 'neonGlass' 
                      ? 'bg-purple-400/20 border border-purple-400'
                      : currentSkin === 'warmGlow'
                      ? 'bg-red-400/20 border border-red-400'
                      : 'bg-gray-400/20 border border-gray-400'
                  }`}
                  variants={blockVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                />
              </>
            )}
            
            {/* Иконка архитектуры */}
            <Boxes 
              className={`w-5 h-5 ${
                currentSkin === 'neonGlass' 
                  ? 'text-cyan-100'
                  : currentSkin === 'warmGlow'
                  ? 'text-orange-100'
                  : 'text-gray-100'
              }`}
            />
          </motion.div>
          
          <motion.h1 
            className={`text-xl sm:text-2xl font-bold mb-1 ${
              currentSkin === 'neonGlass' 
                ? 'text-cyan-400'
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

          {/* Компактные Trust indicators */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className={`px-2 py-1 rounded-full ${
              currentSkin === 'neonGlass' 
                ? 'bg-cyan-500/20 text-cyan-300'
                : currentSkin === 'warmGlow'
                ? 'bg-orange-500/20 text-orange-300'
                : 'bg-gray-500/20 text-gray-300'
            }`}>
              {content.trust.experience}
            </div>
            <div className={`px-2 py-1 rounded-full ${
              currentSkin === 'neonGlass' 
                ? 'bg-green-500/20 text-green-300'
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

        {/* Компактная интерактивная схема архитектуры */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {/* Frontend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
              currentSkin === 'neonGlass' 
                ? 'bg-cyan-500/10 border border-cyan-400/20 hover:bg-cyan-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-orange-500/10 border border-orange-400/20 hover:bg-orange-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
          >
            <div className="flex items-center mb-1">
              <Cpu className={`w-3 h-3 mr-1 ${
                currentSkin === 'neonGlass' 
                  ? 'text-cyan-400'
                  : currentSkin === 'warmGlow'
                  ? 'text-orange-400'
                  : 'text-gray-400'
              }`} />
              <h3 className={`text-xs font-semibold ${
                currentSkin === 'neonGlass' 
                  ? 'text-cyan-300'
                  : currentSkin === 'warmGlow'
                  ? 'text-orange-300'
                  : 'text-gray-300'
              }`}>
                Frontend
              </h3>
            </div>
            <p className="text-xs text-white/80">
              React, Next.js, TS
            </p>
          </motion.div>

          {/* Backend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
              currentSkin === 'neonGlass' 
                ? 'bg-green-500/10 border border-green-400/20 hover:bg-green-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-emerald-500/10 border border-emerald-400/20 hover:bg-emerald-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
          >
            <div className="flex items-center mb-1">
              <Server className={`w-3 h-3 mr-1 ${
                currentSkin === 'neonGlass' 
                  ? 'text-green-400'
                  : currentSkin === 'warmGlow'
                  ? 'text-emerald-400'
                  : 'text-gray-400'
              }`} />
              <h3 className={`text-xs font-semibold ${
                currentSkin === 'neonGlass' 
                  ? 'text-green-300'
                  : currentSkin === 'warmGlow'
                  ? 'text-emerald-300'
                  : 'text-gray-300'
              }`}>
                Backend
              </h3>
            </div>
            <p className="text-xs text-white/80">
              Node.js, Python, Go
            </p>
          </motion.div>

          {/* Database */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
              currentSkin === 'neonGlass' 
                ? 'bg-purple-500/10 border border-purple-400/20 hover:bg-purple-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-red-500/10 border border-red-400/20 hover:bg-red-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
          >
            <div className="flex items-center mb-1">
              <Database className={`w-3 h-3 mr-1 ${
                currentSkin === 'neonGlass' 
                  ? 'text-purple-400'
                  : currentSkin === 'warmGlow'
                  ? 'text-red-400'
                  : 'text-gray-400'
              }`} />
              <h3 className={`text-xs font-semibold ${
                currentSkin === 'neonGlass' 
                  ? 'text-purple-300'
                  : currentSkin === 'warmGlow'
                  ? 'text-red-300'
                  : 'text-gray-300'
              }`}>
                Database
              </h3>
            </div>
            <p className="text-xs text-white/80">
              PostgreSQL, Redis
            </p>
          </motion.div>

          {/* Infrastructure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
              currentSkin === 'neonGlass' 
                ? 'bg-yellow-500/10 border border-yellow-400/20 hover:bg-yellow-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-amber-500/10 border border-amber-400/20 hover:bg-amber-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
          >
            <div className="flex items-center mb-1">
              <Network className={`w-3 h-3 mr-1 ${
                currentSkin === 'neonGlass' 
                  ? 'text-yellow-400'
                  : currentSkin === 'warmGlow'
                  ? 'text-amber-400'
                  : 'text-gray-400'
              }`} />
              <h3 className={`text-xs font-semibold ${
                currentSkin === 'neonGlass' 
                  ? 'text-yellow-300'
                  : currentSkin === 'warmGlow'
                  ? 'text-amber-300'
                  : 'text-gray-300'
              }`}>
                Infrastructure
              </h3>
            </div>
            <p className="text-xs text-white/80">
              AWS, Docker, K8s
            </p>
          </motion.div>
        </div>

        {/* Компактные дополнительные элементы с hover модалками */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {/* NFR требования */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 relative ${
              currentSkin === 'neonGlass'
                ? 'bg-blue-500/10 border border-blue-400/20 hover:bg-blue-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-indigo-500/10 border border-indigo-400/20 hover:bg-indigo-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
            onMouseEnter={() => setHoveredElement('nfr')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className="flex items-center justify-center">
              <Shield className={`w-4 h-4 mr-2 ${
                currentSkin === 'neonGlass'
                  ? 'text-blue-400'
                  : currentSkin === 'warmGlow'
                  ? 'text-indigo-400'
                  : 'text-gray-400'
              }`} />
              <h3 className={`text-sm font-semibold ${
                currentSkin === 'neonGlass'
                  ? 'text-blue-300'
                  : currentSkin === 'warmGlow'
                  ? 'text-indigo-300'
                  : 'text-gray-300'
              }`}>
                NFR Требования
              </h3>
            </div>
          </motion.div>

          {/* Выбор стека технологий */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 relative ${
              currentSkin === 'neonGlass' 
                ? 'bg-purple-500/10 border border-purple-400/20 hover:bg-purple-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-pink-500/10 border border-pink-400/20 hover:bg-pink-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
            onMouseEnter={() => setHoveredElement('techStack')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className="flex items-center justify-center">
              <Zap className={`w-4 h-4 mr-2 ${
                currentSkin === 'neonGlass' 
                  ? 'text-purple-400'
                  : currentSkin === 'warmGlow'
                  ? 'text-pink-400'
                  : 'text-gray-400'
              }`} />
              <h3 className={`text-sm font-semibold ${
                currentSkin === 'neonGlass' 
                  ? 'text-purple-300'
                  : currentSkin === 'warmGlow'
                  ? 'text-pink-300'
                  : 'text-gray-300'
              }`}>
                Выбор стека
              </h3>
            </div>
          </motion.div>

          {/* План миграций */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 relative ${
              currentSkin === 'neonGlass' 
                ? 'bg-indigo-500/10 border border-indigo-400/20 hover:bg-indigo-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-violet-500/10 border border-violet-400/20 hover:bg-violet-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
            onMouseEnter={() => setHoveredElement('migration')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className="flex items-center justify-center">
              <ArrowRight className={`w-4 h-4 mr-2 ${
                currentSkin === 'neonGlass' 
                  ? 'text-indigo-400'
                  : currentSkin === 'warmGlow'
                  ? 'text-violet-400'
                  : 'text-gray-400'
              }`} />
              <h3 className={`text-sm font-semibold ${
                currentSkin === 'neonGlass' 
                  ? 'text-indigo-300'
                  : currentSkin === 'warmGlow'
                  ? 'text-violet-300'
                  : 'text-gray-300'
              }`}>
                План миграций
              </h3>
            </div>
          </motion.div>
          </div>
          
          {/* Общее модальное окно */}
          {hoveredElement && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 5 }}
              className={`absolute top-full left-0 right-0 mt-3 p-4 rounded-2xl z-50 shadow-2xl ${
                hoveredElement === 'nfr' 
                  ? currentSkin === 'neonGlass' 
                    ? 'bg-blue-900/95 border-2 border-blue-400/50 backdrop-blur-lg'
                    : currentSkin === 'warmGlow'
                    ? 'bg-indigo-900/95 border-2 border-indigo-400/50 backdrop-blur-lg'
                    : 'bg-gray-900/95 border-2 border-gray-400/50 backdrop-blur-lg'
                  : hoveredElement === 'techStack'
                  ? currentSkin === 'neonGlass' 
                    ? 'bg-purple-900/95 border-2 border-purple-400/50 backdrop-blur-lg'
                    : currentSkin === 'warmGlow'
                    ? 'bg-pink-900/95 border-2 border-pink-400/50 backdrop-blur-lg'
                    : 'bg-gray-900/95 border-2 border-gray-400/50 backdrop-blur-lg'
                  : currentSkin === 'neonGlass' 
                    ? 'bg-indigo-900/95 border-2 border-indigo-400/50 backdrop-blur-lg'
                    : currentSkin === 'warmGlow'
                    ? 'bg-violet-900/95 border-2 border-violet-400/50 backdrop-blur-lg'
                    : 'bg-gray-900/95 border-2 border-gray-400/50 backdrop-blur-lg'
              }`}
            >
              {hoveredElement === 'nfr' && (
                <>
                  <h4 className={`text-sm font-bold mb-2 flex items-center ${
                    currentSkin === 'neonGlass' 
                      ? 'text-blue-200'
                      : currentSkin === 'warmGlow'
                      ? 'text-indigo-200'
                      : 'text-gray-200'
                  }`}>
                    <Shield className="w-4 h-4 mr-2" />
                    NFR Требования
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {modalContent.nfr.items.map((item, index) => (
                      <div key={index} className={`text-xs px-3 py-2 rounded-lg border ${
                        currentSkin === 'neonGlass' 
                          ? `bg-${item.color}-500/30 text-${item.color}-100 border-${item.color}-400/40`
                          : currentSkin === 'warmGlow'
                          ? `bg-${item.color === 'green' ? 'emerald' : item.color === 'red' ? 'orange' : 'amber'}-500/30 text-${item.color === 'green' ? 'emerald' : item.color === 'red' ? 'orange' : 'amber'}-100 border-${item.color === 'green' ? 'emerald' : item.color === 'red' ? 'orange' : 'amber'}-400/40`
                          : 'bg-gray-500/30 text-gray-100 border-gray-400/40'
                      }`}>
                        <div className="font-semibold mb-0.5">{item.label}</div>
                        <div className="text-xs opacity-90">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              {hoveredElement === 'techStack' && (
                <>
                  <h4 className={`text-sm font-bold mb-2 flex items-center ${
                    currentSkin === 'neonGlass' 
                      ? 'text-purple-200'
                      : currentSkin === 'warmGlow'
                      ? 'text-pink-200'
                      : 'text-gray-200'
                  }`}>
                    <Zap className="w-4 h-4 mr-2" />
                    Выбор стека технологий
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {modalContent.techStack.items.map((item, index) => (
                      <div key={index} className={`flex items-start p-2 rounded-lg border ${
                        currentSkin === 'neonGlass' 
                          ? 'bg-cyan-500/20 text-cyan-100 border-cyan-400/40'
                          : currentSkin === 'warmGlow'
                          ? 'bg-orange-500/20 text-orange-100 border-orange-400/40'
                          : 'bg-gray-500/20 text-gray-100 border-gray-400/40'
                      }`}>
                        <ArrowRight className={`w-3 h-3 mr-2 mt-0.5 flex-shrink-0 ${
                          currentSkin === 'neonGlass' 
                            ? 'text-cyan-300'
                            : currentSkin === 'warmGlow'
                            ? 'text-orange-300'
                            : 'text-gray-300'
                        }`} />
                        <div>
                          <div className="font-semibold text-xs mb-0.5">{item.label}</div>
                          <div className="text-xs opacity-90">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              {hoveredElement === 'migration' && (
                <>
                  <h4 className={`text-sm font-bold mb-2 flex items-center ${
                    currentSkin === 'neonGlass' 
                      ? 'text-indigo-200'
                      : currentSkin === 'warmGlow'
                      ? 'text-violet-200'
                      : 'text-gray-200'
                  }`}>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    План миграций
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {modalContent.migration.items.map((item, index) => (
                      <div key={index} className={`flex items-start p-2 rounded-lg border ${
                        currentSkin === 'neonGlass' 
                          ? `bg-${item.color}-500/20 text-${item.color}-100 border-${item.color}-400/40`
                          : currentSkin === 'warmGlow'
                          ? `bg-${item.color === 'green' ? 'emerald' : item.color === 'yellow' ? 'amber' : 'cyan'}-500/20 text-${item.color === 'green' ? 'emerald' : item.color === 'yellow' ? 'amber' : 'cyan'}-100 border-${item.color === 'green' ? 'emerald' : item.color === 'yellow' ? 'amber' : 'cyan'}-400/40`
                          : 'bg-gray-500/20 text-gray-100 border-gray-400/40'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 mt-1 flex-shrink-0 ${
                          currentSkin === 'neonGlass' 
                            ? `bg-${item.color}-400`
                            : currentSkin === 'warmGlow'
                            ? `bg-${item.color === 'green' ? 'emerald' : item.color === 'yellow' ? 'amber' : 'cyan'}-400`
                            : 'bg-gray-400'
                        }`} />
                        <div>
                          <div className="font-semibold text-xs mb-0.5">{item.label}</div>
                          <div className="text-xs opacity-90">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </div>

        {/* Компактный основной контент */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Процесс */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className={`p-2 rounded-lg ${
              currentSkin === 'neonGlass' 
                ? 'bg-cyan-500/10 border border-cyan-400/20'
                : currentSkin === 'warmGlow'
                ? 'bg-orange-500/10 border border-orange-400/20'
                : 'bg-gray-500/10 border border-gray-400/20'
            }`}
          >
            <h3 className={`text-xs font-semibold mb-1 ${
              currentSkin === 'neonGlass' 
                ? 'text-cyan-300'
                : currentSkin === 'warmGlow'
                ? 'text-orange-300'
                : 'text-gray-300'
            }`}>
              Как это работает
            </h3>
            <div className="grid grid-cols-2 gap-1">
              {content.process.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  className="text-xs text-white/90"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + itemIndex * 0.1, duration: 0.3 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Результаты */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className={`p-2 rounded-lg ${
              currentSkin === 'neonGlass' 
                ? 'bg-green-500/10 border border-green-400/20'
                : currentSkin === 'warmGlow'
                ? 'bg-emerald-500/10 border border-emerald-400/20'
                : 'bg-gray-500/10 border border-gray-400/20'
            }`}
          >
            <h3 className={`text-xs font-semibold mb-1 ${
              currentSkin === 'neonGlass' 
                ? 'text-green-300'
                : currentSkin === 'warmGlow'
                ? 'text-emerald-300'
                : 'text-gray-300'
            }`}>
              Что вы получаете
            </h3>
            <div className="space-y-0.5">
              {content.deliverables.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  className="text-xs text-white/90"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + itemIndex * 0.1, duration: 0.3 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Время и гарантия - отдельная строка */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className={`mt-3 p-3 rounded-lg text-center ${
            currentSkin === 'neonGlass' 
              ? 'bg-purple-500/10 border border-purple-400/20'
              : currentSkin === 'warmGlow'
              ? 'bg-red-500/10 border border-red-400/20'
              : 'bg-gray-500/10 border border-gray-400/20'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <motion.div
              className={`text-xs px-3 py-1 rounded-full ${
                currentSkin === 'neonGlass' 
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : currentSkin === 'warmGlow'
                  ? 'bg-orange-500/20 text-orange-300'
                  : 'bg-gray-500/20 text-gray-300'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.3 }}
            >
              ⏱️ {content.timeline}
            </motion.div>
            <p className="text-xs text-white/80">
              {content.guarantee}
            </p>
          </div>
        </motion.div>

        {/* Компактные CTA кнопки */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-2 mt-3 pt-3 border-t border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <button className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-300 ${
            currentSkin === 'neonGlass' 
              ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/25'
              : currentSkin === 'warmGlow'
              ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25'
              : 'bg-gray-500 hover:bg-gray-600 text-white shadow-lg shadow-gray-500/25'
          }`}>
            Задать вопрос
          </button>
          <button className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-300 border ${
            currentSkin === 'neonGlass' 
              ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
              : currentSkin === 'warmGlow'
              ? 'border-orange-400 text-orange-400 hover:bg-orange-400/10'
              : 'border-gray-400 text-gray-400 hover:bg-gray-400/10'
          }`}>
            Обсудить проект
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ProcessStage3