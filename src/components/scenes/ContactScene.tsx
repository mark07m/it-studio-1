'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAppStore } from '@/store/appStore'

const ContactScene = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { theme } = useAppStore()

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would send the data to your backend
      console.log('Form submitted:', formData)
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="w-full h-full flex items-center justify-center p-4 pt-24 sm:pt-28 pb-8 lg:pb-12 overflow-y-auto" role="main" aria-label="Contact section">
      {/* note: backdrop-filter needs non-clipped background */}
      <div className="max-w-6xl w-full h-full flex flex-col justify-center">
        <header className="text-center mb-4">
          <motion.h2
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className={`text-sm md:text-base mt-4 max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to bring your idea to life? We&apos;d love to hear from you and discuss how we can help.
          </motion.p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 flex-1">
          {/* note: backdrop-filter needs non-clipped background */}
          {/* Contact Info */}
          <motion.section
            className="space-y-2 md:space-y-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            aria-labelledby="contact-info-title"
          >
            <h3 
              id="contact-info-title"
              className={`text-base md:text-lg font-semibold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}
            >
              Let&apos;s Talk
            </h3>
            
            <div className="space-y-2 md:space-y-3" role="list">
              <div className="flex items-center space-x-3 md:space-x-4" role="listitem">
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center" aria-hidden="true">
                  <span className="text-cyan-400 text-sm md:text-base lg:text-xl">📧</span>
                </div>
                <div>
                  <p className={`font-semibold text-sm md:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>Email</p>
                  <a 
                    href="mailto:hello@itstudio.com"
                    className={`text-xs md:text-sm hover:text-cyan-400 transition-colors ${
                      theme === 'dark' ? 'text-white/70' : 'text-gray-600'
                    }`}
                  >
                    hello@itstudio.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 md:space-x-4" role="listitem">
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center" aria-hidden="true">
                  <span className="text-cyan-400 text-sm md:text-base lg:text-xl">📱</span>
                </div>
                <div>
                  <p className={`font-semibold text-sm md:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>Phone</p>
                  <a 
                    href="tel:+15551234567"
                    className={`text-xs md:text-sm hover:text-cyan-400 transition-colors ${
                      theme === 'dark' ? 'text-white/70' : 'text-gray-600'
                    }`}
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 md:space-x-4" role="listitem">
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center" aria-hidden="true">
                  <span className="text-cyan-400 text-sm md:text-base lg:text-xl">📍</span>
                </div>
                <div>
                  <p className={`font-semibold text-sm md:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>Location</p>
                  <p className={`text-xs md:text-sm ${
                    theme === 'dark' ? 'text-white/70' : 'text-gray-600'
                  }`}>San Francisco, CA</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-2 md:space-y-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            aria-labelledby="contact-form-title"
            noValidate
          >
            <h3 
              id="contact-form-title"
              className={`text-base md:text-lg font-semibold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}
            >
              Send us a message
            </h3>
            
            <div>
              <label 
                htmlFor="contact-name"
                className={`block font-semibold mb-2 text-sm md:text-base ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                Name <span className="text-red-400" aria-label="required">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (errors.name) {
                    setErrors({ ...errors, name: '' })
                  }
                }}
                className={`w-full px-3 py-2 md:px-4 md:py-3 glass focus:outline-none transition-all duration-300 text-sm md:text-base focus:ring-2 focus:ring-cyan-400/50 ${
                  errors.name ? 'ring-2 ring-red-400' : ''
                }`}
                placeholder="Your name"
                required
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-400 text-xs mt-1" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            
            <div>
              <label 
                htmlFor="contact-email"
                className={`block font-semibold mb-2 text-sm md:text-base ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                Email <span className="text-red-400" aria-label="required">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  if (errors.email) {
                    setErrors({ ...errors, email: '' })
                  }
                }}
                className={`w-full px-3 py-2 md:px-4 md:py-3 glass focus:outline-none transition-all duration-300 text-sm md:text-base focus:ring-2 focus:ring-cyan-400/50 ${
                  errors.email ? 'ring-2 ring-red-400' : ''
                }`}
                placeholder="your@email.com"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            
            <div>
              <label 
                htmlFor="contact-message"
                className={`block font-semibold mb-2 text-sm md:text-base ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                Message <span className="text-red-400" aria-label="required">*</span>
              </label>
              <textarea
                id="contact-message"
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value })
                  if (errors.message) {
                    setErrors({ ...errors, message: '' })
                  }
                }}
                rows={4}
                className={`w-full px-3 py-2 md:px-4 md:py-3 backdrop-blur-[16px] rounded-lg focus:outline-none transition-all duration-300 resize-none text-sm md:text-base ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-cyan-400/50'
                    : 'bg-white/25 border-gray-200/50 text-gray-800 placeholder-gray-500 focus:border-cyan-500/50'
                } border ${errors.message ? 'ring-2 ring-red-400' : ''}`}
                placeholder="Tell us about your project..."
                required
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-red-400 text-xs mt-1" role="alert">
                  {errors.message}
                </p>
              )}
            </div>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg" role="alert">
                <p className="text-green-400 text-sm">Message sent successfully! We&apos;ll get back to you soon.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg" role="alert">
                <p className="text-red-400 text-sm">Failed to send message. Please try again.</p>
              </div>
            )}
            
            <motion.button
              type="submit"
              className="w-full py-3 md:py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 shadow-[0_0_30px_rgba(0,255,255,0.4)] text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              disabled={isSubmitting}
              aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </main>
  )
}

export default ContactScene
