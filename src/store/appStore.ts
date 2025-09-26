import { create } from 'zustand'

export type SceneType = 'hero' | 'capabilities' | 'portfolio' | 'process' | 'technologies' | 'pricing' | 'contact'

export type SceneState = 'idle' | 'out' | 'in' | 'ready'

export type HeroStage = 1 | 2 | 3 | 4

interface AppState {
  currentScene: SceneType
  sceneState: SceneState
  isTransitioning: boolean
  soundEnabled: boolean
  theme: 'light' | 'dark'
  language: 'en' | 'ru'
  cmdKOpen: boolean
  
  // Hero stage management
  heroStage: HeroStage
  isHeroTransitioning: boolean
  prefersReducedMotion: boolean
  
  // Actions
  setCurrentScene: (scene: SceneType) => void
  setSceneState: (state: SceneState) => void
  setTransitioning: (transitioning: boolean) => void
  toggleSound: () => void
  toggleTheme: () => void
  toggleLanguage: () => void
  toggleCmdK: () => void
  
  // Hero stage actions
  setHeroStage: (stage: HeroStage) => void
  nextHeroStage: () => void
  prevHeroStage: () => void
  setHeroTransitioning: (transitioning: boolean) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  currentScene: 'hero',
  sceneState: 'ready',
  isTransitioning: false,
  soundEnabled: true,
  theme: 'dark',
  language: 'en',
  cmdKOpen: false,
  
  // Hero stage management
  heroStage: 1,
  isHeroTransitioning: false,
  prefersReducedMotion: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  setCurrentScene: (scene) => set({ currentScene: scene }),
  setSceneState: (state) => set({ sceneState: state }),
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'ru' : 'en' })),
  toggleCmdK: () => set((state) => ({ cmdKOpen: !state.cmdKOpen })),
  
  // Hero stage actions
  setHeroStage: (stage) => set({ heroStage: stage }),
  nextHeroStage: () => {
    const { heroStage, isHeroTransitioning } = get()
    if (isHeroTransitioning || heroStage >= 4) return
    set({ heroStage: (heroStage + 1) as HeroStage, isHeroTransitioning: true })
    // Reset transition flag after animation
    setTimeout(() => set({ isHeroTransitioning: false }), 600)
  },
  prevHeroStage: () => {
    const { heroStage, isHeroTransitioning } = get()
    if (isHeroTransitioning || heroStage <= 1) return
    set({ heroStage: (heroStage - 1) as HeroStage, isHeroTransitioning: true })
    // Reset transition flag after animation
    setTimeout(() => set({ isHeroTransitioning: false }), 600)
  },
  setHeroTransitioning: (transitioning) => set({ isHeroTransitioning: transitioning }),
}))

// Scene configuration
export const SCENES: Record<SceneType, { title: string; description: string }> = {
  hero: { title: 'Hero', description: 'Welcome to IT Studio' },
  capabilities: { title: 'Capabilities', description: 'Our Services' },
  portfolio: { title: 'Portfolio', description: 'Our Works' },
  process: { title: 'Process', description: 'How We Work' },
  technologies: { title: 'Technologies', description: 'Tech Stack' },
  pricing: { title: 'Pricing', description: 'Get Quote' },
  contact: { title: 'Contact', description: 'Get In Touch' },
}
