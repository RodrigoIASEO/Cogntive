import React, { useState, KeyboardEvent } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="p-4 border-t border-white/10 backdrop-blur-md bg-black/20">
      <div className="flex gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Escribe tu mensaje..."
          className="flex-grow p-2 rounded-lg bg-white/10 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-white/20 min-h-[40px] max-h-[120px]"
          rows={1}
        />
        <button
          onClick={handleSubmit}
          disabled={!message.trim()}
          className={`
            p-2 rounded-lg transition-all duration-200
            ${message.trim() 
              ? 'bg-white/20 hover:bg-white/30 text-white' 
              : 'bg-white/10 text-white/30 cursor-not-allowed'}
          `}
          aria-label="Enviar mensaje"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default ChatInput 