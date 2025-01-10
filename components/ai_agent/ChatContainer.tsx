'use client';

import React, { useState, useEffect } from 'react';
import ChatBotInfo from './ChatBotInfo';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { Message } from './types';
import { X } from 'lucide-react';

interface ChatContainerProps {
  onClose: () => void;
  isOpen: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ onClose, isOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [sessionId] = useState<string>(() => `session_${Date.now()}_${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
    }
  }, [isOpen]);

  const handleSendMessage = async (messageContent: string): Promise<void> => {
    try {
      // Agregar mensaje del usuario
      setMessages((prev) => [...prev, { sender: 'user', content: messageContent }]);
      setIsTyping(true);

      // Enviar mensaje al backend
      const response = await fetch('https://AiAgent-cognitivedsai.replit.app/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageContent,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la comunicación con el servidor');
      }

      const data = await response.json();

      // Validar y manejar la respuesta
      if (data.reply) {
        setMessages((prev) => [...prev, { sender: 'assistant', content: data.reply }]);
      } else {
        throw new Error('Respuesta vacía del asistente');
      }
    } catch (error) {
      console.error('Error en la comunicación:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          content: 'Lo siento, estoy teniendo problemas para procesar tu mensaje. ¿Podrías intentarlo de nuevo?',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-50">
      <div
        className={`
          absolute right-4 bottom-4
          bg-black/30 backdrop-blur-md
          flex flex-col
          transition-all duration-300 ease-in-out
          border border-white/10 rounded-lg
          w-[90vw] h-[80vh] max-w-[400px] max-h-[600px]
          opacity-0 translate-y-4
          data-[state=open]:opacity-100 data-[state=open]:translate-y-0
        `}
        data-state={isOpen ? 'open' : 'closed'}
      >
        <button
          className="absolute -top-2 -right-2 p-1 bg-black/30 text-white/70 hover:text-white rounded-full z-10 transition-colors"
          onClick={onClose}
          aria-label="Cerrar chat"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col h-full overflow-hidden">
          <ChatBotInfo />
          <ChatMessages messages={messages} isTyping={isTyping} />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;