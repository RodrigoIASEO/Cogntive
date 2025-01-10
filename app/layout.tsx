import React from 'react'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTopButton from '@/components/ui/ScrollToTopButton'
import ChatbotWrapper from '@/components/ai_agent/ChatbotWrapper'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap'
})

export async function generateMetadata() {
  return {
    title: 'Cognitive Data Solutions',
    description: 'Transformando datos en soluciones inteligentes',
    keywords: 'data solutions, cognitive, AI, data analytics',
    metadataBase: new URL('https://cognitiveds.ai'),
    openGraph: {
      title: 'Cognitive Data Solutions',
      description: 'Transformando datos en soluciones inteligentes',
      url: 'https://cognitiveds.ai',
      siteName: 'Cognitive Data Solutions',
      locale: 'es_ES',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    }
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <ScrollToTopButton />
        <ChatbotWrapper />
        <Footer />
      </body>
    </html>
  )
}