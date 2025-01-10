import React from 'react'

interface GradientWrapperProps {
  children: React.ReactNode
}

const GradientWrapper: React.FC<GradientWrapperProps> = ({ children }) => {
  return (
    <div 
      className="min-h-screen w-full fixed inset-0 overflow-auto"
      style={{
        background: `
          linear-gradient(135deg,
            #4222D5 0%,
            #5026ED 25%,
            #4726E5 50%,
            #3524D0 75%,
            #2521BD 100%
          )
        `,
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        zIndex: -1
      }}
    >
      {children}
    </div>
  )
}

export default GradientWrapper