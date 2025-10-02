'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Layers, Zap, Target, X, Info } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

const CapabilityStage1 = () => {
  const { currentSkin, prefersReducedMotion } = useAppStore()
  const [isBuilding, setIsBuilding] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<any>(null)
  
  const buildingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pulseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Микро-анимация строительства
  useEffect(() => {
    const startBuilding = () => {
      if (prefersReducedMotion) return
      
      setIsBuilding(true)
      
      if (buildingTimeoutRef.current) {
        clearTimeout(buildingTimeoutRef.current)
      }
      
      buildingTimeoutRef.current = setTimeout(() => {
        setIsBuilding(false)
      }, 2000)
    }

    startBuilding()
    const interval = setInterval(startBuilding, 6000)

    return () => {
      clearInterval(interval)
      if (buildingTimeoutRef.current) {
        clearTimeout(buildingTimeoutRef.current)
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
    title: "Product Architecture",
    subtitle: "Масштабируемая архитектура для вашего бизнеса",
    features: [
      { 
        title: "Микросервисы", 
        description: "Модульная архитектура",
        icon: Building2,
        color: "blue",
        details: "Независимое масштабирование сервисов, изоляция отказов, технологическое разнообразие"
      },
      { 
        title: "API-First", 
        description: "Единый интерфейс",
        icon: Layers,
        color: "green",
        details: "RESTful API, GraphQL, WebSocket, документация OpenAPI, версионирование"
      },
      { 
        title: "Event-Driven", 
        description: "Асинхронная обработка",
        icon: Zap,
        color: "purple",
        details: "Message queues, event sourcing, CQRS, real-time уведомления"
      },
      { 
        title: "Cloud-Native", 
        description: "Облачные технологии",
        icon: Target,
        color: "orange",
        details: "Kubernetes, Docker, serverless, auto-scaling, мониторинг"
      }
    ],
    benefits: [
      "Масштабируемость до миллионов пользователей",
      "Независимое развертывание сервисов",
      "Высокая отказоустойчивость",
      "Быстрая адаптация к изменениям"
    ],
    technologies: [
      "Docker, Kubernetes, Istio",
      "Redis, PostgreSQL, MongoDB",
      "RabbitMQ, Apache Kafka",
      "AWS, GCP, Azure"
    ],
    timeline: "2-4 недели",
    guarantee: "Гарантируем масштабируемую архитектуру"
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
            className="inline-flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500"
            animate={isBuilding ? {
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Building2 
              className={`w-5 h-5 ${
                currentSkin === 'neonGlass' 
                  ? 'text-blue-100'
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
                  ? `bg-${feature.color === 'blue' ? 'cyan' : feature.color === 'green' ? 'emerald' : feature.color === 'purple' ? 'red' : 'orange'}-500/10 border border-${feature.color === 'blue' ? 'cyan' : feature.color === 'green' ? 'emerald' : feature.color === 'purple' ? 'red' : 'orange'}-400/20 hover:bg-${feature.color === 'blue' ? 'cyan' : feature.color === 'green' ? 'emerald' : feature.color === 'purple' ? 'red' : 'orange'}-500/20`
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
                      ? `bg-${feature.color === 'blue' ? 'cyan' : feature.color === 'green' ? 'emerald' : feature.color === 'purple' ? 'red' : 'orange'}-500/20`
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
                      ? `text-${feature.color === 'blue' ? 'cyan' : feature.color === 'green' ? 'emerald' : feature.color === 'purple' ? 'red' : 'orange'}-400`
                      : 'text-gray-400'
                  }`} />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-xs font-semibold ${
                    currentSkin === 'neonGlass' 
                      ? `text-${feature.color}-300`
                      : currentSkin === 'warmGlow'
                      ? `text-${feature.color === 'blue' ? 'cyan' : feature.color === 'green' ? 'emerald' : feature.color === 'purple' ? 'red' : 'orange'}-300`
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
                ? 'bg-purple-500/10 border border-purple-400/20'
                : currentSkin === 'warmGlow'
                ? 'bg-orange-500/10 border border-orange-400/20'
                : 'bg-gray-500/10 border border-gray-400/20'
            }`}
            onClick={() => openModal({ title: 'Технологии', items: content.technologies })}
          >
            <h3 className={`text-xs font-semibold mb-1 ${
              currentSkin === 'neonGlass' 
                ? 'text-purple-300'
                : currentSkin === 'warmGlow'
                ? 'text-orange-300'
                : 'text-gray-300'
            }`}>
              Технологии
            </h3>
            <p className="text-xs text-white/70">Docker, K8s, AWS...</p>
          </motion.div>
        </div>

        {/* CTA кнопки */}
        <motion.div 
          className="flex gap-2"
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
            Узнать больше
          </button>
          <button className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-300 border ${
            currentSkin === 'neonGlass' 
              ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
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

export default CapabilityStage1
