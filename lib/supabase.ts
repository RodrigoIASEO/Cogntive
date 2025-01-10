import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan las variables de entorno de Supabase')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos para las tablas
export interface Conversation {
  id: string
  thread_id: string
  platform: string
  status: 'active' | 'completed' | 'error'
  created_at: string
  last_updated: string
}

export interface UserMetadata {
  id: string
  conversation_id: string
  ip_address: string
  country: string
  region: string
  city: string
  os: string
  device: string
  user_agent: string
  created_at: string
}

export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
} 