'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Layers, Accessibility, Sparkles, X, Info } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

const CapabilityStage2 = () => {
  const { currentSkin, prefersReducedMotion } = useAppStore()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<any>(null)
  
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pulseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Микро-анимация дизайна
  useEffect(() => {
    const startAnimation = () => {
      if (prefersReducedMotion) return
      
      setIsAnimating(true)
      
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
      
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false)
      }, 2000)
    }

    startAnimation()
    const interval = setInterval(startAnimation, 5000)

    return () => {
      clearInterval(interval)
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [prefersReducedMotion])

  // Пульсация иконки
  useEffect(() => {
    const startPulse = () => {
      if (prefersReducedMotion) return
      
      setIsPulsing(true)
      
      if (pulseTimeoutRef.current) {
        clearTimeout(pulseTimeoutRef.current)
      }
      
      pulseTimeoutRef.current = setTimeout(() => {
        setIsPulsing(false)
      }, 1000)
    }

    startPulse()
    const interval = setInterval(startPulse, 4000)

    return () => {
      clearInterval(interval)
      if (pulseTimeoutRef.current) {
        clearTimeout(pulseTimeoutRef.current)
      }
    }
  }, [prefersReducedMotion])

  const openModal = (content: any) => {
    setModalContent(content)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalContent(null)
  }

  const content = {
    title: "Design Systems",
    subtitle: "Дизайн-системы уровня Notion",
    features: [
      { 
        title: "Design Tokens", 
        description: "Цвета, типографика, отступы",
        icon: Palette,
        color: "purple",
        details: "Централизованное управление дизайн-токенами, автоматическая генерация CSS переменных, темная/светлая темы"
      },
      { 
        title: "Component Library", 
        description: "Переиспользуемые компоненты",
        icon: Layers,
        color: "blue",
        details: "Storybook, Chromatic, автоматическое тестирование, документация компонентов, версионирование"
      },
      { 
        title: "Accessibility", 
        description: "WCAG AA соответствие",
        icon: Accessibility,
        color: "green",
        details: "Автоматическая проверка доступности, семантическая разметка, поддержка скрин-ридеров, контрастность"
      },
      { 
        title: "Animation System", 
        description: "Единые принципы анимации",
        icon: Sparkles,
        color: "orange",
        details: "Framer Motion, Lottie, easing функции, duration стандарты, микро-взаимодействия"
      }
    ],
    benefits: [
      "Консистентный дизайн во всех продуктах",
      "Ускорение разработки в 3-5 раз",
      "Легкое масштабирование команды",
      "Автоматическое обновление компонентов"
    ],
    technologies: [
      "Figma, Storybook, Chromatic",
      "React, Vue, Angular компоненты",
      "CSS-in-JS, Styled Components",
      "Framer Motion, Lottie"
    ],
    timeline: "3-6 недель",
    guarantee: "Гарантируем профессиональную дизайн-систему"
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        className={`relative max-w-4xl w-full ${
          currentSkin === 'neonGlass' 
            ? 'bg-white/10 backdrop-blur-md border border-cyan-400/30 shadow-2xl shadow-cyan-400/20'
            : currentSkin === 'warmGlow'
            ? 'bg-white/10 backdrop-blur-md border border-orange-400/30 shadow-2xl shadow-orange-400/20'
            : 'bg-white/10 backdrop-blur-md border border-gray-400/30 shadow-2xl shadow-gray-400/20'
        } rounded-2xl p-4`}
      >
        {/* Заголовок с иконкой */}
        <div className="text-center mb-4">
          <motion.div
            className="inline-flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-gradient-to-br from-purple-400 to-pink-500"
            animate={isAnimating ? {
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Palette 
              className={`w-5 h-5 ${
                currentSkin === 'neonGlass' 
                  ? 'text-purple-100'
                  : currentSkin === 'warmGlow'
                  ? 'text-orange-100'
                  : 'text-gray-100'
              }`}
            />
          </motion.div>
          
          <motion.h1 
            className={`text-xl font-bold mb-1 ${
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
            className="text-xs text-white/80 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {content.subtitle}
          </motion.p>
        </div>

        {/* Основные возможности - компактная сетка */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {content.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className={`p-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                currentSkin === 'neonGlass' 
                  ? `bg-${feature.color}-500/10 border border-${feature.color}-400/20 hover:bg-${feature.color}-500/20`
                  : currentSkin === 'warmGlow'
                  ? `bg-${feature.color === 'purple' ? 'red' : feature.color === 'blue' ? 'cyan' : feature.color === 'green' ? 'emerald' : 'orange'}-500/10 border border-${feature.color === 'purple' ? 'red' : feature.color === 'blue' ? 'cyan' : feature.color === 'green' ? 'emerald' : 'orange'}-400/20 hover:bg-${feature.color === 'purple' ? 'red' : feature.color === 'blue' ? 'cyan' : feature.color === 'green' ? 'emerald' : 'orange'}-500/20`
                  : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
              }`}
              onClick={() => openModal(feature)}
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  className={`p-1 rounded ${
                    currentSkin === 'neonGlass' 
                      ? `bg-${feature.color}-500/20`
                      : currentSkin === 'warmGlow'
                      ? `bg-${feature.color === 'purple' ? 'red' : feature.color === 'blue' ? 'cyan' : feature.color === 'green' ? 'emerald' : 'orange'}-500/20`
                      : 'bg-gray-500/20'
                  }`}
                  animate={isPulsing ? { 
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <feature.icon className={`w-4 h-4 ${
                    currentSkin === 'neonGlass' 
                      ? `text-${feature.color}-400`
                      : currentSkin === 'warmGlow'
                      ? `text-${feature.color === 'purple' ? 'red' : feature.color === 'blue' ? 'cyan' : feature.color === 'green' ? 'emerald' : 'orange'}-400`
                      : 'text-gray-400'
                  }`} />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-xs font-semibold ${
                    currentSkin === 'neonGlass' 
                      ? `text-${feature.color}-300`
                      : currentSkin === 'warmGlow'
                      ? `text-${feature.color === 'purple' ? 'red' : feature.color === 'blue' ? 'cyan' : feature.color === 'green' ? 'emerald' : 'orange'}-300`
                      : 'text-gray-300'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className="text-xs text-white/70 truncate">
                    {feature.description}
                  </p>
                </div>
                <Info className="w-3 h-3 text-white/50" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Компактная информация */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {/* Преимущества */}
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
            onClick={() => openModal({ title: 'Преимущества', items: content.benefits })}
          >
            <h3 className={`text-xs font-semibold mb-1 ${
              currentSkin === 'neonGlass' 
                ? 'text-green-300'
                : currentSkin === 'warmGlow'
                ? 'text-emerald-300'
                : 'text-gray-300'
            }`}>
              Преимущества
            </h3>
            <p className="text-xs text-white/70">4 ключевых преимущества</p>
          </motion.div>

          {/* Технологии */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className={`p-2 rounded-lg ${
              currentSkin === 'neonGlass' 
                ? 'bg-blue-500/10 border border-blue-400/20'
                : currentSkin === 'warmGlow'
                ? 'bg-cyan-500/10 border border-cyan-400/20'
                : 'bg-gray-500/10 border border-gray-400/20'
            }`}
            onClick={() => openModal({ title: 'Технологии', items: content.technologies })}
          >
            <h3 className={`text-xs font-semibold mb-1 ${
              currentSkin === 'neonGlass' 
                ? 'text-blue-300'
                : currentSkin === 'warmGlow'
                ? 'text-cyan-300'
                : 'text-gray-300'
            }`}>
              Технологии
            </h3>
            <p className="text-xs text-white/70">Figma, Storybook...</p>
          </motion.div>
        </div>

        {/* Интерактивная демонстрация цветов */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div className="flex space-x-2">
            {[
              { color: '#00ffff', name: 'Cyan' },
              { color: '#ff6b6b', name: 'Red' },
              { color: '#4ecdc4', name: 'Teal' },
              { color: '#45b7d1', name: 'Blue' },
              { color: '#96ceb4', name: 'Green' }
            ].map((item, index) => (
              <motion.div
                key={item.color}
                className="relative group"
                animate={isAnimating ? { 
                  scale: [1, 1.2, 1],
                  boxShadow: [`0 0 0 0 ${item.color}40`, `0 0 20px ${item.color}40`, `0 0 0 0 ${item.color}40`]
                } : {}}
                transition={{ 
                  duration: 2, 
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <div 
                  className="w-6 h-6 rounded-full cursor-pointer"
                  style={{ backgroundColor: item.color }}
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-white/80 whitespace-nowrap">{item.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA кнопки */}
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <button className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-300 ${
            currentSkin === 'neonGlass' 
              ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/25'
              : currentSkin === 'warmGlow'
              ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25'
              : 'bg-gray-500 hover:bg-gray-600 text-white shadow-lg shadow-gray-500/25'
          }`}>
            Примеры
          </button>
          <button className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-300 border ${
            currentSkin === 'neonGlass' 
              ? 'border-purple-400 text-purple-400 hover:bg-purple-400/10'
              : currentSkin === 'warmGlow'
              ? 'border-orange-400 text-orange-400 hover:bg-orange-400/10'
              : 'border-gray-400 text-gray-400 hover:bg-gray-400/10'
          }`}>
            Обсудить
          </button>
        </motion.div>

        {/* Модальное окно */}
        <AnimatePresence>
          {showModal && modalContent && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className={`max-w-md w-full max-h-[80vh] overflow-y-auto ${
                  currentSkin === 'neonGlass' 
                    ? 'bg-gray-900 border border-cyan-400/30'
                    : currentSkin === 'warmGlow'
                    ? 'bg-gray-900 border border-orange-400/30'
                    : 'bg-gray-900 border border-gray-400/30'
                } rounded-2xl p-6`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
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
                    {modalContent.title}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <X className="w-5 h-5 text-white/70" />
                  </button>
                </div>
                
                {modalContent.details ? (
                  <p className="text-white/80 text-sm leading-relaxed">
                    {modalContent.details}
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {modalContent.items?.map((item: string, index: number) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className={`mr-2 mt-1 ${
                          currentSkin === 'neonGlass' 
                            ? 'text-cyan-400'
                            : currentSkin === 'warmGlow'
                            ? 'text-orange-400'
                            : 'text-gray-400'
                        }`}>•</span>
                        <span className="text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default CapabilityStage2