"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  id: number
  name: string
  company: string
  testimonial: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Isabella Montero",
    company: "Nexus Fintech",
    testimonial: "La implementación de soluciones Full Stack por CognitiveDS transformó completamente nuestro sistema financiero. La integración con Supabase nos dio la seguridad y escalabilidad que necesitábamos.",
    image: "/images/testimonials/isabella.webp"
  },
  {
    id: 2,
    name: "Ricardo Valencia",
    company: "InnovaTech Latam",
    testimonial: "La automatización de procesos que implementó CognitiveDS con N8N revolucionó nuestra operación. Redujimos tiempos de proceso en un 70% y mejoramos significativamente la experiencia de nuestros clientes.",
    image: "/images/testimonials/ricardo.webp"
  },
  {
    id: 3,
    name: "Carolina Herrera",
    company: "DataFlow Solutions",
    testimonial: "El equipo de CognitiveDS no solo desarrolló nuestra plataforma, sino que nos capacitó para mantenerla y escalarla. Su experiencia en tecnologías modernas fue fundamental para nuestro éxito.",
    image: "/images/testimonials/carolina.webp"
  },
  {
    id: 4,
    name: "Andrés Mendoza",
    company: "TechMind Consulting",
    testimonial: "La consultoría y desarrollo Full Stack de CognitiveDS nos permitió modernizar toda nuestra infraestructura tecnológica. Su enfoque en soluciones escalables fue exactamente lo que necesitábamos.",
    image: "/images/testimonials/andres.webp"
  }
]

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [isAnimating])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    if (isAnimating) return
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % testimonials.length
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1
    })
  }

  return (
    <section id="testimonios" className="py-32 relative overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Testimonios
          </h2>
          <p className="text-xl text-slate-300">
            Lo que nuestros clientes dicen sobre nosotros
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto h-[400px] md:h-[300px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              onAnimationStart={() => setIsAnimating(true)}
              onAnimationComplete={() => setIsAnimating(false)}
              className="absolute inset-0"
            >
              <div className="bg-purple-900/30 backdrop-blur-sm border border-purple-600/50 rounded-lg p-8 md:p-12 h-full">
                <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="rounded-full object-cover"
                      sizes="(max-width: 128px) 100vw, 128px"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-gray-200 text-lg md:text-xl mb-6 italic">
                      "{testimonials[currentIndex].testimonial}"
                    </p>
                    <div>
                      <p className="font-semibold text-white text-lg">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-yellow-300">
                        {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 bg-purple-900/50 hover:bg-purple-900/70 p-2 rounded-full text-white transition-colors duration-200"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 bg-purple-900/50 hover:bg-purple-900/70 p-2 rounded-full text-white transition-colors duration-200"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-yellow-300' : 'bg-purple-600/50'
                }`}
                onClick={() => {
                  const newDirection = index > currentIndex ? 1 : -1
                  setDirection(newDirection)
                  setCurrentIndex(index)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection