'use client'

import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface CounterProps {
  value: number
  suffix?: string
}

interface Achievement {
  value: number
  label: string
  suffix?: string
}

const achievements: Achievement[] = [
  { value: 30, label: 'Proyectos Completados' },
  { value: 15, label: 'Clientes Satisfechos' },
  { value: 95, label: 'Tasa de Éxito', suffix: '%' },
  { value: 2, label: 'Años de Trayectoria' }
]

const Counter: React.FC<CounterProps> = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
      })

      const start = 0
      const end = value
      const duration = 2000
      const range = end - start
      let current = start
      const increment = end > start ? 1 : -1
      const stepTime = Math.abs(Math.floor(duration / range))

      const timer = setInterval(() => {
        current += increment
        setCount(current)
        if (current === end) {
          clearInterval(timer)
        }
      }, stepTime)

      return () => clearInterval(timer)
    } else {
      controls.start({ opacity: 0, y: 20 })
      setCount(0)
    }
  }, [inView, controls, value])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="text-5xl font-bold text-white"
    >
      {count}{suffix}
    </motion.span>
  )
}

const AchievementItem: React.FC<Achievement> = ({ value, label, suffix }) => (
  <motion.div
    className="text-center p-4 bg-purple-900/30 backdrop-blur-sm rounded-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Counter value={value} suffix={suffix} />
    <p className="mt-2 text-lg text-gray-200">{label}</p>
  </motion.div>
)

const AchievementsSection: React.FC = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  return (
    <section ref={ref} className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          Nuestros Logros
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {achievements.map((achievement, index) => (
            <AchievementItem key={index} {...achievement} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AchievementsSection