'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const PricingScene = () => {
  const [selectedPlan, setSelectedPlan] = useState('standard')

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
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <motion.h2
          className="text-5xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Pricing Plans
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`backdrop-blur-[16px] bg-white/10 border rounded-xl p-8 cursor-pointer transition-all duration-300 ${
                selectedPlan === plan.id 
                  ? 'border-cyan-400/50 bg-white/20' 
                  : 'border-white/20 hover:bg-white/20'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center text-white font-bold text-xl`}>
                  {plan.name.charAt(0)}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-white mb-6">
                  {plan.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-white/70 text-sm">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? 'bg-cyan-400 text-white'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choose Plan
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingScene
