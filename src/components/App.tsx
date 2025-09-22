'use client'

import { useAppStore } from '@/store/appStore'
import HeroScene from './scenes/HeroScene'
import CapabilitiesScene from './scenes/CapabilitiesScene'
import PortfolioScene from './scenes/PortfolioScene'
import ProcessScene from './scenes/ProcessScene'
import TechnologiesScene from './scenes/TechnologiesScene'
import PricingScene from './scenes/PricingScene'
import ContactScene from './scenes/ContactScene'

const App = () => {
  const { currentScene } = useAppStore()

  const renderScene = () => {
    switch (currentScene) {
      case 'hero':
        return <HeroScene />
      case 'capabilities':
        return <CapabilitiesScene />
      case 'portfolio':
        return <PortfolioScene />
      case 'process':
        return <ProcessScene />
      case 'technologies':
        return <TechnologiesScene />
      case 'pricing':
        return <PricingScene />
      case 'contact':
        return <ContactScene />
      default:
        return <HeroScene />
    }
  }

  return (
    <div className="w-full h-full">
      {renderScene()}
    </div>
  )
}

export default App
