"use client"

import React from 'react'
import { motion, useAnimation, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

interface TeamMemberCardProps extends TeamMember {
  index: number
  controls: ReturnType<typeof useAnimation>
}

const teamMembers: TeamMember[] = [
  {
    name: "Jorge Daniel Carreón Guzmán",
    role: "CEO y Fundador de CognitiveDS",
    bio: "Experto en desarrollo Full Stack con amplia experiencia en tecnologías modernas como Next.js, Supabase y N8N. Especializado en la implementación de soluciones empresariales escalables y automatización de procesos.",
    image: "/images/Daniel1.jpg"
  },
  {
    name: "Rodrigo De La Torre Sánchez",
    role: "CEO y Director general CognitiveDS",
    bio: "Líder en desarrollo Full Stack con experiencia en arquitectura de software y DevOps. Especialista en implementaciones con Cursor AI, React, Node.js y herramientas de automatización como N8N.",
    image: "/images/Rod1.jpg"
  }
]

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, role, bio, image, index, controls }) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2 }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      <Card className="bg-purple-900/30 backdrop-blur-sm border-purple-600/50 hover:bg-purple-800/40 transition-colors duration-300">
        <CardContent className="p-6 text-center">
          <div className="relative w-[200px] h-[200px] mx-auto mb-4">
            <Image 
              src={image} 
              alt={name} 
              fill
              className="rounded-full object-cover"
              sizes="(max-width: 200px) 100vw, 200px"
              priority={index < 2}
            />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">{name}</h3>
          <p className="text-yellow-300 mb-4">{role}</p>
          <p className="text-sm text-gray-200 leading-relaxed">{bio}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const TeamSection: React.FC = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  React.useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const sectionVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        when: "beforeChildren" 
      }
    }
  }

  return (
    <section id="equipo" className="py-20" ref={ref}>
      <motion.div 
        className="container mx-auto px-4"
        variants={sectionVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nuestro Equipo
          </h2>
          <p className="text-xl text-slate-300">
            Expertos en desarrollo Full Stack y automatización de procesos empresariales
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamMemberCard 
              key={index} 
              {...member} 
              index={index} 
              controls={controls} 
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default TeamSection