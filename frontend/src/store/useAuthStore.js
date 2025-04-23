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
    } catch (error) {
      console.error(`Error in checkAuth: ${error.message}`)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },
  signup: async data => {
    console.log('test2')
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post('/auth/signup', data)
      set({ authUser: res.data })
      toast.success('Signup successful')
    } catch (error) {
      console.error(`Error in signup: ${error.message}`)
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
    } catch (error) {
      console.error(`Error in logout: ${error.message}`)
      toast.error('Logout failed: ' + error.response.data.message)
    }
  },
  login: async data => {
    set({ isLoggingIn: true })
    try {
      const res = await axiosInstance.post('/auth/login', data)
      set({ authUser: res.data })
      toast.success('Login successful')
    } catch (error) {
      console.error(`Error in login: ${error.message}`)
      toast.error('Login failed: ' + error.response.data.message)
    }
  },
  updateProfile: async data => {
    set({ isUpdatingProfile: true })
    try {
      const res = await axiosInstance.put('/auth/update-profile', data)
      set({ authUser: res.data })
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error(`Error in updateProfile: ${error.message}`)
      toast.error('Profile update failed: ' + error.response.data.message)
    } finally {
      set({ isUpdatingProfile: false })
    }
  }
}))
