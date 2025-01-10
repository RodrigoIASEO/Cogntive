"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Database, 
  Workflow, 
  Laptop,
  Lightbulb,
  LucideIcon
} from 'lucide-react'

interface Service {
  title: string
  description: string
  examples: string[]
  icon: LucideIcon
  iconColor: string
}

const services: Service[] = [
  {
    title: "Desarrollo Frontend",
    description: "Creamos interfaces modernas y responsivas utilizando las últimas tecnologías web.",
    examples: [
      "Aplicaciones web progresivas (PWA)",
      "Dashboards interactivos",
      "Portales empresariales",
      "Sitios web de comercio electrónico"
    ],
    icon: Laptop,
    iconColor: "text-yellow-400"
  },
  {
    title: "Desarrollo Backend",
    description: "Implementamos APIs robustas y bases de datos escalables con Supabase y Node.js.",
    examples: [
      "APIs RESTful y GraphQL",
      "Sistemas de autenticación",
      "Bases de datos en tiempo real",
      "Microservicios"
    ],
    icon: Database,
    iconColor: "text-purple-400"
  },
  {
    title: "Automatización",
    description: "Optimizamos procesos empresariales mediante flujos de trabajo automatizados con N8N.",
    examples: [
      "Integración de APIs",
      "Automatización de marketing",
      "Procesamiento de datos",
      "Workflows personalizados"
    ],
    icon: Workflow,
    iconColor: "text-orange-400"
  },
  {
    title: "Consultoría y Capacitación",
    description: "Potenciamos tu equipo con asesoramiento experto y capacitación en tecnologías modernas.",
    examples: [
      "Arquitectura de soluciones",
      "Mejores prácticas Full Stack",
      "Workshops de N8N y Supabase",
      "Mentoría de desarrollo"
    ],
    icon: Lightbulb,
    iconColor: "text-pink-400"
  }
]

const ServiceCard: React.FC<Service> = ({ title, description, examples, icon: Icon, iconColor }) => {
  return (
    <motion.div
      className="bg-slate-800/10 backdrop-blur-sm rounded-lg p-6 flex flex-col h-full border border-white/5 hover:bg-slate-800/20 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg bg-slate-700/20 ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-slate-300 mb-4 text-sm flex-grow">{description}</p>
      <div>
        <h4 className="text-yellow-400 text-sm font-medium uppercase tracking-wider mb-2">Ejemplos:</h4>
        <ul className="space-y-2">
          {examples.map((example, index) => (
            <li key={index} className="flex items-center gap-2 text-slate-300 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400/50"></span>
              {example}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

const ServicesSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section 
      id="servicios" 
      className="min-h-screen relative scroll-mt-32 py-16" 
      ref={ref}
    >
      <div className="container mx-auto px-4 h-full flex flex-col">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Servicios Full Stack
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Desarrollamos soluciones tecnológicas completas y escalables para impulsar tu negocio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection 