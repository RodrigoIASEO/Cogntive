'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 md:right-1/2 md:translate-x-1/2 bg-yellow-400 text-purple-900 p-2 rounded-full hover:bg-yellow-500 transition-colors opacity-70 hover:opacity-100 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  )
}

export default ScrollToTopButton