'use client'

import { useState, useEffect } from 'react'
import GlassHeader from './GlassHeader'
import GlassDock from './GlassDock'
import DockTrigger from './DockTrigger'
import SceneShell from './SceneShell'
import { useAppStore } from '@/store/appStore'

interface AppShellProps {
  children: React.ReactNode
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
      {/* note: backdrop-filter needs non-clipped background */}
      {/* Animated Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient layer */}
        <div className={`absolute inset-0 ${theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800' 
          : 'bg-gradient-to-br from-slate-50 via-cyan-50/30 to-purple-50/20'
        }`} />
        
        {/* Animated radial gradients */}
        <div className={`absolute inset-0 animate-pulse-slow ${theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_40%)]'
          : 'bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.08),transparent_40%)]'
        }`} />
        
        <div className={`absolute inset-0 animate-pulse-slow ${theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.12),transparent_35%)]'
          : 'bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.06),transparent_35%)]'
        }`} />
        
        <div className={`absolute inset-0 animate-pulse-slow ${theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_60%_20%,rgba(236,72,153,0.10),transparent_30%)]'
          : 'bg-[radial-gradient(circle_at_60%_20%,rgba(236,72,153,0.05),transparent_30%)]'
        }`} />
        
        {/* Moving gradient spots */}
        <div className={`absolute inset-0 animate-float-1 ${theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_40%_60%,rgba(34,197,94,0.08),transparent_25%)]'
          : 'bg-[radial-gradient(circle_at_40%_60%,rgba(34,197,94,0.04),transparent_25%)]'
        }`} />
        
        <div className={`absolute inset-0 animate-float-2 ${theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_70%_40%,rgba(251,146,60,0.06),transparent_20%)]'
          : 'bg-[radial-gradient(circle_at_70%_40%,rgba(251,146,60,0.03),transparent_20%)]'
        }`} />
        
        {/* Subtle noise texture */}
        <div className={`absolute inset-0 opacity-30 ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGZpbHRlciBpZD0ibm9pc2UiPjxmZUdhdXNzaWFuQmx1ciBpbj0iU291cmNlR3JhcGhpYyIgc3Q9IjAuNSIvPjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEgMCIvPjwvZmlsdGVyPjxyZWN0IGZpbHRlcj0idXJsKCNub2lzZSkiIHg9IjAiIHk9IjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjAyIi8+PC9zdmc+')] bg-repeat animate-drift" />
        </div>
      </div>

      {/* App Shell */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <GlassHeader />
        
        {/* Main Content */}
        <main className="flex-1 h-full">
          {/* note: backdrop-filter needs non-clipped background */}
          <SceneShell>
            {children}
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
