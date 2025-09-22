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
    <div className={`h-screen w-full overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Background Pattern */}
      <div className={`fixed inset-0 ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
        <div className={`absolute inset-0 ${theme === 'dark' 
          ? 'bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10' 
          : 'bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20'
        }`} />
        <div className={`absolute inset-0 ${theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]'
          : 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.2),transparent_50%)]'
        }`} />
      </div>

      {/* App Shell */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <GlassHeader />
        
        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
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
