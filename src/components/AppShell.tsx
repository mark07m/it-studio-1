'use client'

import { useState, useEffect } from 'react'
import GlassHeader from './GlassHeader'
import GlassDock from './GlassDock'
import DockTrigger from './DockTrigger'
import SceneShell from './SceneShell'
import App from './App'
import AppBackground from './backgrounds/AppBackground'
import { useAppStore } from '@/store/appStore'

interface AppShellProps {
  children?: React.ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  const { theme } = useAppStore()
  const [isDockVisible, setIsDockVisible] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  // Определяем, является ли устройство десктопом
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024) // lg breakpoint
    }
    
    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  return (
    <div className={`h-screen w-full overflow-x-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Общий фон для всех сцен */}
      <AppBackground className="fixed inset-0 z-0" />

      {/* App Shell */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <GlassHeader />
        
        {/* Main Content */}
        <main className="flex-1 h-full">
          {/* note: backdrop-filter needs non-clipped background */}
          <SceneShell>
            <App />
          </SceneShell>
        </main>
        
        {/* Dock Trigger (Desktop only) */}
        {isDesktop && <DockTrigger onHover={setIsDockVisible} />}
        
        {/* Dock */}
        <GlassDock 
          isVisible={!isDesktop || isDockVisible} 
          onHover={isDesktop ? setIsDockVisible : undefined}
        />
      </div>
    </div>
  )
}

export default AppShell
