'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed w-full z-50 backdrop-blur-sm bg-purple-900/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image src="/images/CDS.png" alt="Cognitive Data Solutions Logo" width={40} height={40} />
            <span className="ml-2 text-xl font-bold text-white">Cognitive Data Solutions</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-yellow-400 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 items-center">
              <li>
                <button 
                  onClick={() => scrollToSection('inicio')} 
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('servicios')} 
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('equipo')} 
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  Equipo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonios')} 
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  Testimonios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('planes')}
                  className="bg-yellow-400 text-purple-900 px-4 py-2 rounded hover:bg-yellow-500 transition-colors font-bold"
                >
                  Planes
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <button 
                  onClick={() => scrollToSection('inicio')} 
                  className="text-white hover:text-yellow-400 transition-colors w-full text-left"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('servicios')} 
                  className="text-white hover:text-yellow-400 transition-colors w-full text-left"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('equipo')} 
                  className="text-white hover:text-yellow-400 transition-colors w-full text-left"
                >
                  Equipo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonios')} 
                  className="text-white hover:text-yellow-400 transition-colors w-full text-left"
                >
                  Testimonios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('planes')}
                  className="bg-yellow-400 text-purple-900 px-4 py-2 rounded hover:bg-yellow-500 transition-colors font-bold w-full text-left"
                >
                  Planes
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header