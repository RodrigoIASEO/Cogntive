import React from 'react'
import { Button } from "@/components/ui/button"

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Desarrollo <br />
            <span className="text-yellow-300">Full Stack</span> <br />
            de Alto Impacto
          </h1>
          <p className="text-xl mb-8 max-w-2xl text-gray-100">
            En CognitiveDS, creamos soluciones tecnológicas completas y escalables. Utilizamos las últimas tecnologías como Supabase para backend y N8N para automatizaciones, garantizando aplicaciones robustas y eficientes que impulsan el crecimiento de tu negocio.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-900 hover:bg-yellow-300 transition-colors duration-300"
            onClick={() => scrollToSection('planes')}
          >
            Contáctenos
          </Button>
        </div>
        <div className="lg:w-1/2 w-full">
          <div className="relative w-full pt-[56.25%]">
            <iframe
              src="https://www.youtube.com/embed/UuZxPl4vCjA?si=1bxFbV49k_81imIG"
              title="Presentación CognitiveDS"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-xl"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero