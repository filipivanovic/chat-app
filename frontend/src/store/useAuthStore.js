import { create } from 'zustand/react'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'

export const useAuthStore = create(set => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check')
      set({ authUser: res.data })
    } catch ( error ) {
      console.error(`Error in checkAuth: ${ error.message }`)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },
  signup: async (data) => {
    console.log('test2')
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post('/auth/signup', data)
      set({ authUser: res.data })
      toast.success('Signup successful')
    } catch ( error ) {
      console.error(`Error in signup: ${ error.message }`)
      toast.error('Signup failed: ' + error.response.data.message)
    } finally {
      set({ isSigningUp: false })
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout')
      set({ authUser: null })
      toast.success('Logout successful')
    } catch ( error ) {
      console.error(`Error in logout: ${ error.message }`)
      toast.error('Logout failed: ' + error.response.data.message)
    }
  }
}))
