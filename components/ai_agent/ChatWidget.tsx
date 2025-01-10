import React, { useState } from 'react'
import ChatBubble from './ChatBubble'
import ChatContainer from './ChatContainer'
import { Message } from './types'

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handleToggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {!isOpen && <ChatBubble onClick={handleToggleChat} />}
      <ChatContainer 
        onClose={handleToggleChat}
        isOpen={isOpen}
        messages={messages}
        setMessages={setMessages}
      />
    </>
  )
}

export default ChatWidget 