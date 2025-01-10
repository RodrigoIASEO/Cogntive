"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Building2, Briefcase, Cog } from 'lucide-react'

interface PlanProps {
  title: string
  price: string
  description: string
  features: string[]
  icon: React.ReactNode
  buttonText: string
  calendarLink: string
  isPopular?: boolean
}

const Plan: React.FC<PlanProps> = ({ title, price, description, features, icon, buttonText, calendarLink, isPopular }) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="bg-purple-900/30 backdrop-blur-md rounded-lg p-6 flex flex-col h-full transform transition-all duration-500 relative overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Efecto de brillo en hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-purple-600/10 to-yellow-400/10 transition-opacity duration-700 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} 
          style={{
            backgroundSize: '200% 100%',
            animation: isHovered ? 'shimmer 2s infinite' : 'none'
          }}
        />

        {/* Borde brillante */}
        <div 
          className={`absolute -inset-[1px] bg-gradient-to-r from-yellow-400/40 via-purple-600/40 to-yellow-400/40 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 ${
            isHovered ? 'animate-gradient-xy' : ''
          }`}
        />

        {/* Etiqueta "Más Popular" */}
        {isPopular && (
          <div className="absolute -left-2 top-8 z-20">
            <span className="bg-yellow-400/90 text-purple-900 text-sm font-semibold px-4 py-1 rounded-r-full shadow-lg">
              Más Popular
            </span>
          </div>
        )}

        {/* Contenido */}
        <div className="relative flex flex-col h-full z-10">
          <div className="flex items-center justify-center mb-4">
            <div className={`p-4 rounded-full ${
              isHovered ? 'bg-yellow-400/80 scale-110' : 'bg-yellow-400/60'
            } transition-all duration-300`}>
              {icon}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center mb-2 text-white">{title}</h3>
          <p className="text-3xl font-bold text-center mb-2 text-white">{price}</p>
          <p className="text-center mb-4 text-gray-200 text-sm">{description}</p>

          <ul className="mb-6 flex-grow space-y-2">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start text-gray-200 text-sm"
              >
                <svg className="w-5 h-5 mr-2 text-yellow-400/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          <a
            href={calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              relative overflow-hidden px-6 py-2.5 rounded-lg text-center font-bold transition-all duration-300
              ${isHovered 
                ? 'bg-yellow-400/90 text-purple-900 transform scale-105' 
                : 'bg-yellow-400/80 text-purple-900'
              }
            `}
          >
            <span className="relative z-10">{buttonText}</span>
            <div className={`
              absolute inset-0 bg-gradient-to-r from-yellow-300/90 to-yellow-500/90
              transition-transform duration-300
              ${isHovered ? 'scale-x-100' : 'scale-x-0'}
            `} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

const PricingSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const plans: PlanProps[] = [
    {
      title: "Business",
      price: "$1,500 USD/mes",
      description: "Desarrollo Full Stack completo para empresas en crecimiento",
      features: [
        "Desarrollo Frontend y Backend personalizado",
        "Integración con Supabase y bases de datos",
        "Implementación de flujos con N8N",
        "Despliegue y mantenimiento continuo",
        "Soporte técnico prioritario",
        "Actualizaciones mensuales",
        "Dashboard de análisis y monitoreo",
        "Optimización de rendimiento"
      ],
      icon: <Briefcase className="w-8 h-8 text-purple-900" />,
      buttonText: "Comenzar Ahora",
      calendarLink: "https://cal.com/cognitiveds.ai/consultoria",
      isPopular: true
    },
    {
      title: "Enterprise",
      price: "Personalizado",
      description: "Soluciones robustas y equipo dedicado para grandes empresas",
      features: [
        "Equipo dedicado de desarrollo",
        "Arquitectura personalizada",
        "Integraciones empresariales avanzadas",
        "Automatización de procesos complejos",
        "SLA garantizado",
        "Soporte 24/7",
        "Consultoría estratégica",
        "Escalabilidad empresarial"
      ],
      icon: <Building2 className="w-8 h-8 text-purple-900" />,
      buttonText: "Contactar",
      calendarLink: "https://cal.com/cognitiveds.ai/consultoria-enterprise"
    }
  ]

  return (
    <section id="planes" className="h-screen flex flex-col justify-center py-8">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto -mt-16 mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros Planes
          </h2>
          <p className="text-lg text-slate-300">
            Ofrecemos soluciones flexibles que se adaptan a tus necesidades. 
            Elige el plan que mejor se ajuste a tu empresa y comienza a transformar tu negocio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Plan key={index} {...plan} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        @keyframes gradient-xy {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-xy {
          animation: gradient-xy 3s ease infinite;
          background-size: 400% 400%;
        }

        #planes {
          scroll-margin-top: 5rem;
        }
      `}</style>
    </section>
  )
}

export default PricingSection