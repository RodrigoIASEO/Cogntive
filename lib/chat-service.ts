import { supabase } from './supabase'
import type { Conversation, UserMetadata, Message } from './supabase'
import { UAParser } from 'ua-parser-js'

export class ChatService {
  static async createConversation(platform: string = 'web'): Promise<string> {
    const { data: conversation, error } = await supabase
      .from('conversations')
      .insert([
        { 
          thread_id: crypto.randomUUID(),
          platform,
          status: 'active'
        }
      ])
      .select()
      .single()

    if (error) throw new Error(`Error al crear la conversación: ${error.message}`)
    return conversation.id
  }

  static async addUserMetadata(
    conversationId: string,
    userAgent: string,
    ipAddress: string,
    locationInfo: any
  ): Promise<void> {
    const parser = new UAParser(userAgent)
    const os = `${parser.getOS().name} ${parser.getOS().version}`
    const device = `${parser.getDevice().vendor} ${parser.getDevice().model}`

    const { error } = await supabase
      .from('user_metadata')
      .insert([
        {
          conversation_id: conversationId,
          ip_address: ipAddress,
          country: locationInfo.country,
          region: locationInfo.region,
          city: locationInfo.city,
          os,
          device,
          user_agent: userAgent
        }
      ])

    if (error) throw new Error(`Error al agregar metadatos: ${error.message}`)
  }

  static async addMessage(
    conversationId: string,
    content: string,
    role: 'user' | 'assistant'
  ): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .insert([
        {
          conversation_id: conversationId,
          content,
          role
        }
      ])

    if (error) throw new Error(`Error al agregar mensaje: ${error.message}`)
  }

  static async getConversationMessages(conversationId: string): Promise<Message[]> {
    const { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (error) throw new Error(`Error al obtener mensajes: ${error.message}`)
    return messages
  }

  static async updateConversationStatus(
    conversationId: string,
    status: 'active' | 'completed' | 'error'
  ): Promise<void> {
    const { error } = await supabase
      .from('conversations')
      .update({ status })
      .eq('id', conversationId)

    if (error) throw new Error(`Error al actualizar estado: ${error.message}`)
  }
} 