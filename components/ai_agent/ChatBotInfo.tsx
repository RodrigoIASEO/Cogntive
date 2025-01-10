import React from 'react'
import Image from 'next/image'

const ChatBotInfo: React.FC = () => {
  return (
    <div className="p-4 border-b border-white/10 backdrop-blur-md bg-black/20">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12">
          <Image
            src="/images/ai-bot-icon.webp"
            alt="Bot Avatar"
            fill
            sizes="(max-width: 48px) 100vw, 48px"
            className="object-contain rounded-full"
            priority
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Asistente Virtual</h3>
          <p className="text-sm text-white/70">
            ¿En qué puedo ayudarte hoy?
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatBotInfo 