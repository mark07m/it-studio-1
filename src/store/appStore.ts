import { create } from 'zustand'

export type SceneType = 'hero' | 'capabilities' | 'portfolio' | 'process' | 'technologies' | 'pricing' | 'contact'

export type SceneState = 'idle' | 'out' | 'in' | 'ready'

interface AppState {
  currentScene: SceneType
  sceneState: SceneState
  isTransitioning: boolean
  soundEnabled: boolean
  theme: 'light' | 'dark'
  language: 'en' | 'ru'
  cmdKOpen: boolean
  
  // Actions
  setCurrentScene: (scene: SceneType) => void
  setSceneState: (state: SceneState) => void
  setTransitioning: (transitioning: boolean) => void
  toggleSound: () => void
  toggleTheme: () => void
  toggleLanguage: () => void
  toggleCmdK: () => void
}

export const useAppStore = create<AppState>((set) => ({
  currentScene: 'hero',
  sceneState: 'ready',
  isTransitioning: false,
  soundEnabled: true,
  theme: 'dark',
  language: 'en',
  cmdKOpen: false,
  
  setCurrentScene: (scene) => set({ currentScene: scene }),
  setSceneState: (state) => set({ sceneState: state }),
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'ru' : 'en' })),
  toggleCmdK: () => set((state) => ({ cmdKOpen: !state.cmdKOpen })),
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
