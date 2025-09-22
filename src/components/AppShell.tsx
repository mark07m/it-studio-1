'use client'

import GlassHeader from './GlassHeader'
import GlassDock from './GlassDock'
import SceneShell from './SceneShell'
import { useAppStore } from '@/store/appStore'

interface AppShellProps {
  children: React.ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  const { theme } = useAppStore()

  return (
    <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]" />
      </div>

      {/* App Shell */}
      <div className="relative z-10">
        {/* Header */}
        <GlassHeader />
        
        {/* Main Content */}
        <main className="pt-20 pb-24 min-h-screen">
          <SceneShell>
            {children}
          </SceneShell>
        </main>
        
        {/* Dock */}
        <GlassDock />
      </div>
    </div>
  )
}

export default AppShell
