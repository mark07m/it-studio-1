'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/store/appStore'

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme } = useAppStore()

  useEffect(() => {
    // Apply theme class to body
    if (theme === 'light') {
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
  }, [theme])

  return <>{children}</>
}

export default ThemeProvider
