'use client'

import React from 'react'
import Hero from '@/components/sections/Hero'
import ServicesSection from '@/components/sections/ServicesSection'
import TeamsSection from '@/components/sections/TeamSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import AchievementsSection from '@/components/sections/AchievementsSection'
import PricingSection from '@/components/sections/PricingSection'

export default function Home() {
  return (
    <main className="flex-grow">
      <section id="inicio">
        <Hero />
      </section>
      <section id="servicios">
        <ServicesSection />
      </section>
      <section id="equipo">
        <TeamsSection />
      </section>
      <section id="testimonios">
        <TestimonialsSection />
      </section>
      <AchievementsSection />
      <section id="planes">
        <PricingSection />
      </section>
    </main>
  )
}