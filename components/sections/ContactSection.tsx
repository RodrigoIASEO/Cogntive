"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const ContactSection: React.FC = () => {
  return (
    <section id="contacto" className="py-20 bg-purple-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contáctanos
        </motion.h2>
        <motion.form 
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-4">
            <Input type="text" placeholder="Nombre" className="bg-purple-700 border-purple-600 text-white" />
          </div>
          <div className="mb-4">
            <Input type="email" placeholder="Email" className="bg-purple-700 border-purple-600 text-white" />
          </div>
          <div className="mb-4">
            <Textarea placeholder="Mensaje" className="bg-purple-700 border-purple-600 text-white" />
          </div>
          <Button type="submit" className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-500">
            Enviar
          </Button>
        </motion.form>
      </div>
    </section>
  )
}

export default ContactSection