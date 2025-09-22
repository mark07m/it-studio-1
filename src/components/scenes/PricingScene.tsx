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
    <div className="w-full h-full flex items-center justify-center p-4">
      {/* note: backdrop-filter needs non-clipped background */}
      <div className="max-w-7xl w-full h-full flex flex-col justify-center">
        <motion.h2
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Pricing Plans
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 flex-1 max-h-[60vh] overflow-y-auto">
          {/* note: backdrop-filter needs non-clipped background */}
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`glass p-4 md:p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-cyan-400/50 glass-dark'
                  : 'hover:glass-dark'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div className="text-center">
                <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center text-white font-bold text-lg md:text-xl`}>
                  {plan.name.charAt(0)}
                </div>
                <h3 className={`text-lg md:text-xl lg:text-2xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  {plan.name}
                </h3>
                <div className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  {plan.price}
                </div>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`text-xs md:text-sm ${
                      theme === 'dark' ? 'text-white/70' : 'text-gray-600'
                    }`}>
                      ✓ {feature}
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
              >
                Choose Plan
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingScene
