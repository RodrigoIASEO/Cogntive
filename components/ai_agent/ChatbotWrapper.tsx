'use client'

import React from 'react'
import ChatWidget from './ChatWidget'

const ChatbotWrapper: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <ChatWidget />
    </div>
  )
}

export default ChatbotWrapper 