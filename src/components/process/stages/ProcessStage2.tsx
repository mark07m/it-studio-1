'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Users, Zap, CheckCircle } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

const ProcessStage2 = () => {
  const { currentSkin, prefersReducedMotion } = useAppStore()
  const [isTargeting, setIsTargeting] = useState(false)
  const [isBouncing, setIsBouncing] = useState(false)
  const targetTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const bounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Микро-анимация сборки цели из кругов
  useEffect(() => {
    const startTargeting = () => {
      if (prefersReducedMotion) return
      
      setIsTargeting(true)
      
      // Очищаем предыдущие таймауты
      if (targetTimeoutRef.current) {
        clearTimeout(targetTimeoutRef.current)
      }
      if (bounceTimeoutRef.current) {
        clearTimeout(bounceTimeoutRef.current)
      }
      
      // Завершаем сборку через 600мс
      targetTimeoutRef.current = setTimeout(() => {
        setIsTargeting(false)
        // Запускаем bounce эффект
        setIsBouncing(true)
        bounceTimeoutRef.current = setTimeout(() => {
          setIsBouncing(false)
        }, 300)
      }, 600)
    }

    // Запускаем анимацию при монтировании
    startTargeting()

    // Повторяем каждые 5 секунд
    const interval = setInterval(startTargeting, 5000)

    return () => {
      clearInterval(interval)
      if (targetTimeoutRef.current) {
        clearTimeout(targetTimeoutRef.current)
      }
      if (bounceTimeoutRef.current) {
        clearTimeout(bounceTimeoutRef.current)
      }
    }
  }, [prefersReducedMotion])

  const content = {
    title: "Product Vision",
    subtitle: "Создаём видение продукта, который изменит рынок",
    trust: {
      experience: "100+ продуктов",
      success: "90% market fit",
      expertise: "Эксперты по JTBD"
    },
    process: [
      "Value Prop & Jobs To Be Done",
      "Пользовательские сценарии", 
      "Сегментация аудиторий",
      "Определение MVP/MLP"
    ],
    deliverables: [
      "Vision Brief (проблема → решение)",
      "Scope v1 с приоритетами",
      "Customer Journey карта"
    ],
    timeline: "5–10 рабочих дней",
    guarantee: "Гарантируем четкое видение продукта"
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
        {/* Заголовок с иконкой */}
        <div className="text-center mb-6">
          <motion.div
            className="relative inline-flex items-center justify-center w-12 h-12 mb-3"
            animate={isBouncing ? {
              scale: [1, 1.2, 1],
              y: [0, -8, 0]
            } : {}}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Круги для сборки цели */}
            {isTargeting && (
              <>
                <motion.div
                  className={`absolute w-12 h-12 rounded-full border-2 ${
                    currentSkin === 'neonGlass' 
                      ? 'border-cyan-400'
                      : currentSkin === 'warmGlow'
                      ? 'border-orange-400'
                      : 'border-gray-400'
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0, duration: 0.3, ease: "easeOut" }}
                />
                <motion.div
                  className={`absolute w-8 h-8 rounded-full border-2 ${
                    currentSkin === 'neonGlass' 
                      ? 'border-cyan-300'
                      : currentSkin === 'warmGlow'
                      ? 'border-orange-300'
                      : 'border-gray-300'
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
                />
                <motion.div
                  className={`absolute w-4 h-4 rounded-full ${
                    currentSkin === 'neonGlass' 
                      ? 'bg-cyan-400'
                      : currentSkin === 'warmGlow'
                      ? 'bg-orange-400'
                      : 'bg-gray-400'
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
                />
              </>
            )}
            
            {/* Иконка цели */}
            <Target 
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
        </div>

        {/* Интерактивные элементы для демонстрации JTBD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
              currentSkin === 'neonGlass' 
                ? 'bg-cyan-500/10 border border-cyan-400/20 hover:bg-cyan-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-orange-500/10 border border-orange-400/20 hover:bg-orange-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
          >
            <div className="flex items-center mb-2">
              <Zap className={`w-4 h-4 mr-2 ${
                currentSkin === 'neonGlass' 
                  ? 'text-cyan-400'
                  : currentSkin === 'warmGlow'
                  ? 'text-orange-400'
                  : 'text-gray-400'
              }`} />
              <h3 className={`text-sm font-semibold ${
                currentSkin === 'neonGlass' 
                  ? 'text-cyan-300'
                  : currentSkin === 'warmGlow'
                  ? 'text-orange-300'
                  : 'text-gray-300'
              }`}>
                Value Prop
              </h3>
            </div>
            <p className="text-xs text-white/80">
              Уникальная ценность для пользователя
            </p>
          </motion.div>

          {/* Jobs To Be Done */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
              currentSkin === 'neonGlass' 
                ? 'bg-green-500/10 border border-green-400/20 hover:bg-green-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-emerald-500/10 border border-emerald-400/20 hover:bg-emerald-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
          >
            <div className="flex items-center mb-2">
              <CheckCircle className={`w-4 h-4 mr-2 ${
                currentSkin === 'neonGlass' 
                  ? 'text-green-400'
                  : currentSkin === 'warmGlow'
                  ? 'text-emerald-400'
                  : 'text-gray-400'
              }`} />
              <h3 className={`text-sm font-semibold ${
                currentSkin === 'neonGlass' 
                  ? 'text-green-300'
                  : currentSkin === 'warmGlow'
                  ? 'text-emerald-300'
                  : 'text-gray-300'
              }`}>
                JTBD
              </h3>
            </div>
            <p className="text-xs text-white/80">
              Задачи, которые решает продукт
            </p>
          </motion.div>

          {/* User Scenarios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
              currentSkin === 'neonGlass' 
                ? 'bg-purple-500/10 border border-purple-400/20 hover:bg-purple-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-red-500/10 border border-red-400/20 hover:bg-red-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
          >
            <div className="flex items-center mb-2">
              <Users className={`w-4 h-4 mr-2 ${
                currentSkin === 'neonGlass' 
                  ? 'text-purple-400'
                  : currentSkin === 'warmGlow'
                  ? 'text-red-400'
                  : 'text-gray-400'
              }`} />
              <h3 className={`text-sm font-semibold ${
                currentSkin === 'neonGlass' 
                  ? 'text-purple-300'
                  : currentSkin === 'warmGlow'
                  ? 'text-red-300'
                  : 'text-gray-300'
              }`}>
                Сценарии
              </h3>
            </div>
            <p className="text-xs text-white/80">
              Happy/Edge пути пользователей
            </p>
          </motion.div>

          {/* MVP Scope */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
              currentSkin === 'neonGlass' 
                ? 'bg-yellow-500/10 border border-yellow-400/20 hover:bg-yellow-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-amber-500/10 border border-amber-400/20 hover:bg-amber-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
          >
            <div className="flex items-center mb-2">
              <Target className={`w-4 h-4 mr-2 ${
                currentSkin === 'neonGlass' 
                  ? 'text-yellow-400'
                  : currentSkin === 'warmGlow'
                  ? 'text-amber-400'
                  : 'text-gray-400'
              }`} />
              <h3 className={`text-sm font-semibold ${
                currentSkin === 'neonGlass' 
                  ? 'text-yellow-300'
                  : currentSkin === 'warmGlow'
                  ? 'text-amber-300'
                  : 'text-gray-300'
              }`}>
                MVP Scope
              </h3>
            </div>
            <p className="text-xs text-white/80">
              Минимально ценная версия
            </p>
          </motion.div>
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Процесс */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
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
                  transition={{ delay: 0.9 + itemIndex * 0.05, duration: 0.3 }}
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
            transition={{ delay: 0.9, duration: 0.5 }}
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
                  transition={{ delay: 1.0 + itemIndex * 0.05, duration: 0.3 }}
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
            transition={{ delay: 1.0, duration: 0.5 }}
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
                transition={{ delay: 1.1, duration: 0.3 }}
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
          transition={{ delay: 1.1, duration: 0.5 }}
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

export default ProcessStage2