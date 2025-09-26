import { create } from 'zustand'
import { SkinName } from '@/theme/tokens'

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
  
  // Skin management
  currentSkin: SkinName
  isSkinTransitioning: boolean
  
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
  
  // Skin actions
  setSkin: (skin: SkinName) => void
  nextSkin: () => void
  setSkinTransitioning: (transitioning: boolean) => void
  
  // Accessibility actions
  setPrefersReducedMotion: (prefers: boolean) => void
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
  prefersReducedMotion: false, // Инициализируем как false, обновим на клиенте
  
  // Skin management
  currentSkin: 'neonGlass',
  isSkinTransitioning: false,
  
  setCurrentScene: (scene) => set({ currentScene: scene }),
  setSceneState: (state) => set({ sceneState: state }),
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'ru' : 'en' })),
  toggleCmdK: () => set((state) => ({ cmdKOpen: !state.cmdKOpen })),
  
  // Hero stage actions
  setHeroStage: (stage) => {
    const { isHeroTransitioning } = get()
    if (isHeroTransitioning) return
    set({ heroStage: stage, isHeroTransitioning: true })
  },
  nextHeroStage: () => {
    const { heroStage, isHeroTransitioning } = get()
    if (isHeroTransitioning || heroStage >= 4) return
    set({ heroStage: (heroStage + 1) as HeroStage, isHeroTransitioning: true })
  },
  prevHeroStage: () => {
    const { heroStage, isHeroTransitioning } = get()
    if (isHeroTransitioning || heroStage <= 1) return
    set({ heroStage: (heroStage - 1) as HeroStage, isHeroTransitioning: true })
  },
  setHeroTransitioning: (transitioning) => set({ isHeroTransitioning: transitioning }),
  
  // Skin actions
  setSkin: (skin) => {
    const { isSkinTransitioning } = get()
    if (isSkinTransitioning) return
    set({ currentSkin: skin, isSkinTransitioning: true })
    // Reset transition state after animation
    setTimeout(() => set({ isSkinTransitioning: false }), 500)
  },
  nextSkin: () => {
    const { currentSkin, isSkinTransitioning } = get()
    if (isSkinTransitioning) return
    const skins: SkinName[] = ['neonGlass', 'warmGlow', 'monoWireframe']
    const currentIndex = skins.indexOf(currentSkin)
    const nextIndex = (currentIndex + 1) % skins.length
    set({ currentSkin: skins[nextIndex], isSkinTransitioning: true })
    setTimeout(() => set({ isSkinTransitioning: false }), 500)
  },
  setSkinTransitioning: (transitioning) => set({ isSkinTransitioning: transitioning }),
  
  // Accessibility actions
  setPrefersReducedMotion: (prefers) => set({ prefersReducedMotion: prefers }),
}))

// Инициализация prefersReducedMotion на клиенте
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  useAppStore.getState().setPrefersReducedMotion(mediaQuery.matches);
  
  // Слушаем изменения
  mediaQuery.addEventListener('change', (e) => {
    useAppStore.getState().setPrefersReducedMotion(e.matches);
  });
}

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
