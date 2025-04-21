import { create } from 'zustand/react'
import { axiosInstance } from '../lib/axios.js'

export const useAuthStore = create(set => ({
  authUser: null,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check')
      set({ authUser: res.data })
    } catch (error) {
      console.error(`Error in checkAuth: ${error.message}`)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  }
}))
