'use client'

import { useAppStore } from '@/store/appStore'
import HeroStageManager from '../hero/HeroStageManager'
import HeroBackground from '../hero/backgrounds/HeroBackground'

const HeroScene = () => {
  const { theme } = useAppStore()

  return (
    <main className="w-full h-full relative flex-1" role="main" aria-label="Hero section">
      {/* Multi-layer Background System */}
      <HeroBackground className="absolute inset-0" />

      {/* Hero Stage Manager */}
      <HeroStageManager className="w-full h-full relative z-30" />
    </main>
  )
}

export default HeroScene
