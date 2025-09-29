'use client'

import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/appStore'

interface CanvasFallbackProps {
  processStage?: number
  className?: string
}

const CanvasFallback = ({ processStage = 1, className = '' }: CanvasFallbackProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const { currentSkin, prefersReducedMotion } = useAppStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Анимация частиц
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      hue: number
    }> = []

    // Создаем частицы
    const createParticles = () => {
      particles.length = 0
      const particleCount = prefersReducedMotion ? 20 : 50
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          hue: currentSkin === 'neonGlass' ? 180 + Math.random() * 60 : 
               currentSkin === 'warmGlow' ? 20 + Math.random() * 40 : 
               0
        })
      }
    }

    createParticles()

    const animate = () => {
      if (prefersReducedMotion) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle) => {
        // Обновляем позицию
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Отскок от краев
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        // Ограничиваем позицию
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        
        // Рисуем частицу
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`
        ctx.fill()
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentSkin, prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ 
        background: currentSkin === 'neonGlass' 
          ? 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)'
          : currentSkin === 'warmGlow'
          ? 'radial-gradient(ellipse at center, rgba(251, 146, 60, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)'
          : 'radial-gradient(ellipse at center, rgba(107, 114, 128, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)'
      }}
    />
  )
}

export default CanvasFallback
