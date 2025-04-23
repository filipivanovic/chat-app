import { useChatStore } from '../store/useChatStore.js'
import { useEffect } from 'react'
import ChatHeader from './ChatHeader.jsx'
import MessageInput from './MessageInput.jsx'

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore()

  useEffect(() => {
    getMessages(selectedUser._id)
  }, [getMessages, selectedUser._id])

  if (isMessagesLoading) return <div>Loading...</div>

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <p>Messages</p>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
