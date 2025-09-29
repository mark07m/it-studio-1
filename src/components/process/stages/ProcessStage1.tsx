'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

const ProcessStage1 = () => {
  const { currentSkin, prefersReducedMotion } = useAppStore()
  const [isScanning, setIsScanning] = useState(false)
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Микро-анимация маска-скана для иконки 🔍
  useEffect(() => {
    const startScan = () => {
      if (prefersReducedMotion) return
      
      setIsScanning(true)
      
      // Очищаем предыдущий таймаут
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current)
      }
      
      // Завершаем сканирование через 800мс
      scanTimeoutRef.current = setTimeout(() => {
        setIsScanning(false)
      }, 800)
    }

    // Запускаем сканирование при монтировании
    startScan()

    // Повторяем каждые 4 секунды
    const interval = setInterval(startScan, 4000)

    return () => {
      clearInterval(interval)
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current)
      }
    }
  }, [prefersReducedMotion])

  const content = {
    title: "Deep Dive",
    subtitle: "Погружаемся в вашу индустрию как инсайдеры",
    trust: {
      experience: "50+ проектов",
      success: "95% успешных запусков",
      expertise: "Эксперты в вашей нише"
    },
    process: [
      "Интервью со стейкхолдерами",
      "Анализ рынка и конкурентов", 
      "Определение ключевых метрик",
      "Выявление рисков и возможностей"
    ],
    deliverables: [
      "Summary по рынку и инсайтам",
      "Карта заинтересованных сторон",
      "Приоритизированный список рисков"
    ],
    timeline: "3–5 рабочих дней",
    guarantee: "Гарантируем полное понимание вашего бизнеса"
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
        {/* Заголовок с иконкой и доверием */}
        <div className="text-center mb-6">
          <motion.div
            className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500"
            animate={isScanning ? {
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 0 0 rgba(6, 182, 212, 0.4)',
                '0 0 0 15px rgba(6, 182, 212, 0)',
                '0 0 0 0 rgba(6, 182, 212, 0)'
              ]
            } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Search 
              className={`w-6 h-6 ${
                currentSkin === 'neonGlass' 
                  ? 'text-cyan-100'
                  : currentSkin === 'warmGlow'
                  ? 'text-orange-100'
                  : 'text-gray-100'
              }`}
            />
          </motion.div>
          
          <motion.h1 
            className={`text-2xl sm:text-3xl font-bold mb-2 ${
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
            className="text-sm sm:text-base text-white/80 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {content.subtitle}
          </motion.p>

          {/* Trust indicators */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className={`px-3 py-1 rounded-full ${
              currentSkin === 'neonGlass' 
                ? 'bg-cyan-500/20 text-cyan-300'
                : currentSkin === 'warmGlow'
                ? 'bg-orange-500/20 text-orange-300'
                : 'bg-gray-500/20 text-gray-300'
            }`}>
              {content.trust.experience}
            </div>
            <div className={`px-3 py-1 rounded-full ${
              currentSkin === 'neonGlass' 
                ? 'bg-green-500/20 text-green-300'
                : currentSkin === 'warmGlow'
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-gray-500/20 text-gray-300'
            }`}>
              {content.trust.success}
            </div>
            <div className={`px-3 py-1 rounded-full ${
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

        {/* Компактный контент в одну строку */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Процесс */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`p-4 rounded-xl ${
              currentSkin === 'neonGlass' 
                ? 'bg-cyan-500/10 border border-cyan-400/20'
                : currentSkin === 'warmGlow'
                ? 'bg-orange-500/10 border border-orange-400/20'
                : 'bg-gray-500/10 border border-gray-400/20'
            }`}
          >
            <h3 className={`text-sm font-semibold mb-3 ${
              currentSkin === 'neonGlass' 
                ? 'text-cyan-300'
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
                  <span className={`mr-2 mt-1 ${
                    currentSkin === 'neonGlass' 
                      ? 'text-cyan-400'
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
            className={`p-4 rounded-xl ${
              currentSkin === 'neonGlass' 
                ? 'bg-green-500/10 border border-green-400/20'
                : currentSkin === 'warmGlow'
                ? 'bg-emerald-500/10 border border-emerald-400/20'
                : 'bg-gray-500/10 border border-gray-400/20'
            }`}
          >
            <h3 className={`text-sm font-semibold mb-3 ${
              currentSkin === 'neonGlass' 
                ? 'text-green-300'
                : currentSkin === 'warmGlow'
                ? 'text-emerald-300'
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
                  <span className={`mr-2 mt-1 ${
                    currentSkin === 'neonGlass' 
                      ? 'text-cyan-400'
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
            className={`p-4 rounded-xl ${
              currentSkin === 'neonGlass' 
                ? 'bg-purple-500/10 border border-purple-400/20'
                : currentSkin === 'warmGlow'
                ? 'bg-red-500/10 border border-red-400/20'
                : 'bg-gray-500/10 border border-gray-400/20'
            }`}
          >
            <h3 className={`text-sm font-semibold mb-3 ${
              currentSkin === 'neonGlass' 
                ? 'text-purple-300'
                : currentSkin === 'warmGlow'
                ? 'text-red-300'
                : 'text-gray-300'
            }`}>
              Время и гарантия
            </h3>
            <div className="space-y-2">
              <motion.div
                className={`text-xs px-2 py-1 rounded-full inline-block ${
                  currentSkin === 'neonGlass' 
                    ? 'bg-cyan-500/20 text-cyan-300'
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
          className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
            currentSkin === 'neonGlass' 
              ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/25'
              : currentSkin === 'warmGlow'
              ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25'
              : 'bg-gray-500 hover:bg-gray-600 text-white shadow-lg shadow-gray-500/25'
          }`}>
            Задать вопрос
          </button>
          <button className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border ${
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

export default ProcessStage1
