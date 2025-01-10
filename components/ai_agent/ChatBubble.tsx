import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface ChatBubbleProps {
  onClick: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick }) => {
  const [isShining, setIsShining] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShining(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      className={`
        fixed bottom-5 right-5 w-20 h-20 
        bg-black/30 backdrop-blur-md 
        rounded-full flex items-center justify-center 
        z-50 transition-all duration-300
        hover:bg-black/50 hover:scale-105
        border border-white/10
        ${isShining ? 'shine-effect' : ''}
      `}
      onClick={onClick}
      aria-label="Abrir chat"
    >
      <div className="relative w-16 h-16 p-3">
        <Image
          src="/images/ai-bot-icon.webp"
          alt="Chat"
          fill
          sizes="(max-width: 64px) 100vw, 64px"
          className="object-contain"
          priority
        />
        {isShining && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 animate-shine rounded-full" />
        )}
      </div>
    </button>
  );
};

export default ChatBubble; 