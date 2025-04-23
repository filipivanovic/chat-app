import { create } from 'zustand/react'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true })
    try {
      const res = await axiosInstance('/messages/users')
      set({ users: res.data })
    } catch (error) {
      toast.error('Something went wrong: ' + error.response.data.message)
      console.error(`Something went wrong: ${error.message}`)
    } finally {
      set({ isUsersLoading: false })
    }
  },
  getMessages: async userId => {
    set({ isMessagesLoading: true })
    try {
      const res = await axiosInstance(`/messages/${userId}`)
      set({ messages: res.data })
    } catch (error) {
      toast.error('Something went wrong: ' + error.response.data.message)
      console.error(`Something went wrong: ${error.message}`)
    } finally {
      set({ isMessagesLoading: false })
    }
  },
  sendMessage: async messageData => {
    const { selectedUser, messages } = get()
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
      set({ messages: [...messages, res.data] })
    } catch (error) {
      toast.error('Something went wrong: ' + error.response.data.message)
      console.error(`Something went wrong: ${error.message}`)
    }
  },
  setSelectedUser: selectedUser => {
    set({ selectedUser })
  }
}))
