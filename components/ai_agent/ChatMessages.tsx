import React, { useEffect, useRef } from 'react'
import { Message } from './types'
import { Loader2 } from 'lucide-react'

interface ChatMessagesProps {
  messages: Message[]
  isTyping: boolean
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`
            flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}
          `}
        >
          <div
            className={`
              max-w-[80%] p-3 rounded-lg
              ${message.sender === 'user'
                ? 'bg-white/20 text-white ml-4'
                : 'bg-black/20 text-white mr-4'}
            `}
          >
            {message.content}
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-black/20 text-white p-3 rounded-lg flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Escribiendo...</span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessages 