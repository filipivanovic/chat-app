import { create } from 'zustand/react'

export const useThemeStore = create(set => ({
  theme: localStorage.getItem('chatty-theme') || 'light',
  setTheme: theme => {
    localStorage.setItem('chatty-theme', theme)
    set({ theme })
  }
}))
