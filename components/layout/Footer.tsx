import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="backdrop-blur-sm bg-purple-900/30 text-gray-200 py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="inline-flex flex-wrap justify-center items-center gap-1">
          <span>© {currentYear} Cognitive Data Solutions. Todos los derechos reservados.</span>
          <span className="w-1 h-1 bg-gray-200 rounded-full mx-1"></span>
          <Link href="/privacidad" className="hover:text-yellow-300 transition-colors">
            Aviso de Privacidad
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer