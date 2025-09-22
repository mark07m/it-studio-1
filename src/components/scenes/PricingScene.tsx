'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAppStore } from '@/store/appStore'

const PricingScene = () => {
  const [selectedPlan, setSelectedPlan] = useState('standard')
  const { theme } = useAppStore()

  const plans = [
    { 
      id: 'basic', 
      name: 'Basic', 
      price: '$5,000', 
      features: ['Simple website', 'Basic design', '1 month support'],
      color: 'from-gray-400 to-gray-600'
    },
    { 
      id: 'standard', 
      name: 'Standard', 
      price: '$15,000', 
      features: ['Web application', 'Custom design', '3 months support', 'Mobile responsive'],
      color: 'from-cyan-400 to-blue-500'
    },
    { 
      id: 'premium', 
      name: 'Premium', 
      price: '$35,000', 
      features: ['Full-stack app', 'Advanced features', '6 months support', 'AI integration', 'Cloud deployment'],
      color: 'from-purple-400 to-pink-500'
    },
  ]

  return (
    <main className="w-full h-full flex items-center justify-center p-4 pt-20 sm:pt-24" role="main" aria-label="Pricing section">
      {/* note: backdrop-filter needs non-clipped background */}
      <div className="max-w-7xl w-full h-full flex flex-col justify-center">
        <header className="text-center mb-8">
          <motion.h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Pricing Plans
          </motion.h2>
          <motion.p
            className={`text-sm md:text-base mt-4 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Choose the perfect plan for your project needs. All plans include our standard support and maintenance.
          </motion.p>
        </header>
        
        <section 
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 flex-1"
          aria-label="Pricing plans"
        >
          {/* note: backdrop-filter needs non-clipped background */}
          {plans.map((plan, index) => (
            <motion.article
              key={plan.id}
              className={`glass p-3 md:p-4 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-cyan-400/50 glass-dark'
                  : 'hover:glass-dark'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedPlan(plan.id)}
              role="article"
              aria-labelledby={`plan-${index}`}
              aria-pressed={selectedPlan === plan.id}
            >
              <div className="text-center">
                <div className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center text-white font-bold text-sm md:text-base`} aria-hidden="true">
                  {plan.name.charAt(0)}
                </div>
                <h3 
                  id={`plan-${index}`}
                  className={`text-base md:text-lg font-semibold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {plan.name}
                </h3>
                <div className={`text-xl md:text-2xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  {plan.price}
                </div>
                <ul className="space-y-1 mb-3" aria-label={`${plan.name} features`}>
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className={`text-xs flex items-center ${
                        theme === 'dark' ? 'text-white/70' : 'text-gray-600'
                      }`}
                    >
                      <span className="mr-1" aria-hidden="true">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <motion.button
                className={`w-full py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${
                  selectedPlan === plan.id
                    ? 'bg-cyan-400 text-white'
                    : theme === 'dark'
                      ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      : 'bg-white/25 text-gray-800 border-gray-300 hover:bg-white/40'
                } border`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Select ${plan.name} plan`}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
              </motion.button>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default PricingScene
