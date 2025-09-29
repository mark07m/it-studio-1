'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Code2, GitBranch, Rocket, CheckCircle, Clock, Users, BarChart3, X, Info } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

const ProcessStage4 = () => {
  const { currentSkin, prefersReducedMotion } = useAppStore()
  const [isGlowing, setIsGlowing] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [currentCodeLine, setCurrentCodeLine] = useState(0)
  const [isPipelineRunning, setIsPipelineRunning] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [isReleasing, setIsReleasing] = useState(false)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  
  const glowTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pipelineTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Микро-анимация импульса свечения для иконки ⚡
  useEffect(() => {
    const startGlow = () => {
      if (prefersReducedMotion) return
      
      setIsGlowing(true)
      
      if (glowTimeoutRef.current) {
        clearTimeout(glowTimeoutRef.current)
      }
      
      glowTimeoutRef.current = setTimeout(() => {
        setIsGlowing(false)
      }, 600)
    }

    startGlow()
    const interval = setInterval(startGlow, 4000)

    return () => {
      clearInterval(interval)
      if (glowTimeoutRef.current) {
        clearTimeout(glowTimeoutRef.current)
      }
    }
  }, [prefersReducedMotion])

  // Анимация печати кода (typewriter эффект)
  useEffect(() => {
    const codeLines = [
      'const deploy = async () => {',
      '  await runTests();',
      '  await buildApp();',
      '  await deployToProd();',
      '  return "Success! 🚀";',
      '};'
    ]

    const startTyping = () => {
      if (prefersReducedMotion) return
      
      setIsTyping(true)
      setCurrentCodeLine(0)
      
      const typeNextLine = (lineIndex: number) => {
        if (lineIndex < codeLines.length) {
          setCurrentCodeLine(lineIndex)
          typingTimeoutRef.current = setTimeout(() => {
            typeNextLine(lineIndex + 1)
          }, 800)
        } else {
          setTimeout(() => {
            setIsTyping(false)
            setCurrentCodeLine(0)
          }, 1000)
        }
      }
      
      typeNextLine(0)
    }

    startTyping()
    const interval = setInterval(startTyping, 6000)

    return () => {
      clearInterval(interval)
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [prefersReducedMotion])

  // Анимация CI/CD пайплайна
  useEffect(() => {
    const runPipeline = () => {
      if (prefersReducedMotion) return
      
      setIsPipelineRunning(true)
      setIsTesting(true)
      
      setTimeout(() => {
        setIsTesting(false)
        setIsDeploying(true)
      }, 1500)
      
      setTimeout(() => {
        setIsDeploying(false)
        setIsReleasing(true)
      }, 3000)
      
      setTimeout(() => {
        setIsReleasing(false)
        setIsPipelineRunning(false)
      }, 4500)
    }

    runPipeline()
    const interval = setInterval(runPipeline, 8000)

    return () => {
      clearInterval(interval)
    }
  }, [prefersReducedMotion])

  const content = {
    title: "Code & Ship",
    subtitle: "Пишем код уровня FAANG, деплоим как Vercel",
    trust: {
      experience: "1000+ релизов",
      success: "99.9% uptime",
      expertise: "Эксперты по DevOps"
    },
    process: [
      "Git-flow, Code Review, линтеры",
      "CI/CD: тесты, сборки, превью-окружения", 
      "Трекинг задач, демо каждую неделю",
      "E2E/интеграционные/нагрузочные тесты"
    ],
    deliverables: [
      "Релизы каждую 1–2 недели",
      "Чейнджлоги, превью-ссылки",
      "Отчёты покрытия тестов"
    ],
    timeline: "Спринты по 1–2 недели",
    guarantee: "Гарантируем стабильные релизы без откатов"
  }

  const codeLines = [
    'const deploy = async () => {',
    '  await runTests();',
    '  await buildApp();',
    '  await deployToProd();',
    '  return "Success! 🚀";',
    '};'
  ]

  const modalContent = {
    gitflow: {
      title: "Git Flow & Code Review",
      content: [
        "• Ветвление по GitFlow с feature/develop/main ветками",
        "• Обязательный Code Review для всех изменений",
        "• Автоматические линтеры (ESLint, Prettier)",
        "• Pre-commit hooks для проверки качества кода",
        "• Автоматическое тестирование при создании PR"
      ]
    },
    cicd: {
      title: "CI/CD Pipeline",
      content: [
        "• Автоматическая сборка при каждом коммите",
        "• Запуск тестов (unit, integration, e2e)",
        "• Создание preview-окружений для каждой ветки",
        "• Автоматический деплой в staging и production",
        "• Откат изменений при обнаружении проблем"
      ]
    },
    testing: {
      title: "Тестирование",
      content: [
        "• Unit тесты с покрытием >80%",
        "• Integration тесты для API",
        "• E2E тесты критических пользовательских сценариев",
        "• Нагрузочное тестирование",
        "• Автоматические smoke-тесты после деплоя"
      ]
    },
    releases: {
      title: "Релизы",
      content: [
        "• Релизы каждые 1-2 недели",
        "• Автоматические changelog и версионирование",
        "• Feature flags для безопасного развертывания",
        "• Мониторинг метрик после релиза",
        "• Быстрый откат при критических проблемах"
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
            className="inline-flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"
            animate={isGlowing ? {
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 0 0 rgba(251, 191, 36, 0.4)',
                '0 0 0 15px rgba(251, 191, 36, 0)',
                '0 0 0 0 rgba(251, 191, 36, 0)'
              ]
            } : {}}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Zap 
              className={`w-5 h-5 ${
                currentSkin === 'neonGlass' 
                  ? 'text-yellow-100'
                  : currentSkin === 'warmGlow'
                  ? 'text-orange-100'
                  : 'text-gray-100'
              }`}
            />
          </motion.div>
          
          <motion.h1 
            className={`text-xl sm:text-2xl font-bold mb-1 ${
              currentSkin === 'neonGlass' 
                ? 'text-yellow-400'
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
                ? 'bg-yellow-500/20 text-yellow-300'
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

        {/* Интерактивные элементы для демонстрации процесса разработки */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {/* Git Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 relative ${
              currentSkin === 'neonGlass' 
                ? 'bg-cyan-500/10 border border-cyan-400/20 hover:bg-cyan-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-orange-500/10 border border-orange-400/20 hover:bg-orange-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
            onClick={() => setActiveModal('gitflow')}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <GitBranch className={`w-3 h-3 mr-2 ${
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
                  Git Flow
                </h3>
              </div>
              <Info className="w-3 h-3 text-white/60" />
            </div>
            <p className="text-xs text-white/80">
              Code Review, линтеры
            </p>
          </motion.div>

          {/* CI/CD Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 relative ${
              isPipelineRunning 
                ? currentSkin === 'neonGlass' 
                  ? 'bg-green-500/20 border border-green-400/40'
                  : currentSkin === 'warmGlow'
                  ? 'bg-emerald-500/20 border border-emerald-400/40'
                  : 'bg-gray-500/20 border border-gray-400/40'
                : currentSkin === 'neonGlass' 
                ? 'bg-green-500/10 border border-green-400/20 hover:bg-green-500/20'
                : currentSkin === 'warmGlow'
                ? 'bg-emerald-500/10 border border-emerald-400/20 hover:bg-emerald-500/20'
                : 'bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20'
            }`}
            onClick={() => setActiveModal('cicd')}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <motion.div
                  animate={isPipelineRunning ? { rotate: 360 } : {}}
                  transition={{ duration: 2, repeat: isPipelineRunning ? Infinity : 0, ease: "linear" }}
                >
                  <Rocket className={`w-3 h-3 mr-2 ${
                    currentSkin === 'neonGlass' 
                      ? 'text-green-400'
                      : currentSkin === 'warmGlow'
                      ? 'text-emerald-400'
                      : 'text-gray-400'
                  }`} />
                </motion.div>
                <h3 className={`text-xs font-semibold ${
                  currentSkin === 'neonGlass' 
                    ? 'text-green-300'
                    : currentSkin === 'warmGlow'
                    ? 'text-emerald-300'
                    : 'text-gray-300'
                }`}>
                  CI/CD
                </h3>
              </div>
              <Info className="w-3 h-3 text-white/60" />
            </div>
            <p className="text-xs text-white/80">
              {isTesting ? 'Тестирование...' : isDeploying ? 'Деплой...' : isReleasing ? 'Релиз...' : 'Авто-деплой'}
            </p>
          </motion.div>

          {/* Testing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 relative ${
              isTesting 
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
            onClick={() => setActiveModal('testing')}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <motion.div
                  animate={isTesting ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isTesting ? Infinity : 0 }}
                >
                  <CheckCircle className={`w-3 h-3 mr-2 ${
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
                  Тестирование
                </h3>
              </div>
              <Info className="w-3 h-3 text-white/60" />
            </div>
            <p className="text-xs text-white/80">
              E2E, интеграционные тесты
            </p>
          </motion.div>

          {/* Releases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 relative ${
              isReleasing 
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
            onClick={() => setActiveModal('releases')}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <motion.div
                  animate={isReleasing ? { y: [0, -4, 0] } : {}}
                  transition={{ duration: 0.6, repeat: isReleasing ? Infinity : 0 }}
                >
                  <BarChart3 className={`w-3 h-3 mr-2 ${
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
                  Релизы
                </h3>
              </div>
              <Info className="w-3 h-3 text-white/60" />
            </div>
            <p className="text-xs text-white/80">
              Каждую 1–2 недели
            </p>
          </motion.div>
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Процесс */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className={`p-3 rounded-lg ${
              currentSkin === 'neonGlass' 
                ? 'bg-cyan-500/10 border border-cyan-400/20'
                : currentSkin === 'warmGlow'
                ? 'bg-orange-500/10 border border-orange-400/20'
                : 'bg-gray-500/10 border border-gray-400/20'
            }`}
          >
            <h3 className={`text-xs font-semibold mb-2 ${
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
                  transition={{ delay: 1.0 + itemIndex * 0.05, duration: 0.3 }}
                >
                  <span className={`mr-1 mt-1 ${
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
            transition={{ delay: 1.0, duration: 0.5 }}
            className={`p-3 rounded-lg ${
              currentSkin === 'neonGlass' 
                ? 'bg-green-500/10 border border-green-400/20'
                : currentSkin === 'warmGlow'
                ? 'bg-emerald-500/10 border border-emerald-400/20'
                : 'bg-gray-500/10 border border-gray-400/20'
            }`}
          >
            <h3 className={`text-xs font-semibold mb-2 ${
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
                  transition={{ delay: 1.1 + itemIndex * 0.05, duration: 0.3 }}
                >
                  <span className={`mr-1 mt-1 ${
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
            transition={{ delay: 1.1, duration: 0.5 }}
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
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : currentSkin === 'warmGlow'
                    ? 'bg-orange-500/20 text-orange-300'
                    : 'bg-gray-500/20 text-gray-300'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.3 }}
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
          transition={{ delay: 1.2, duration: 0.5 }}
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

export default ProcessStage4
