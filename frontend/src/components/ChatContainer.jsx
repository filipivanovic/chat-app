import { useChatStore } from '../store/useChatStore.js'
import { useEffect } from 'react'

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore()

  useEffect(() => {
    getMessages(selectedUser._id)
  }, [getMessages, selectedUser._id])

  if (isMessagesLoading) return <div>Loading...</div>

  return <div className="flex-1 flex flex-col overflow-auto"></div>
}

export default ChatContainer
