-- Habilitar la extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de conversaciones
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    thread_id TEXT NOT NULL,
    platform TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'error')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de metadatos de usuario
CREATE TABLE IF NOT EXISTS user_metadata (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    ip_address TEXT,
    country TEXT,
    region TEXT,
    city TEXT,
    os TEXT,
    device TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de mensajes
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_conversations_thread_id ON conversations(thread_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_user_metadata_conversation_id ON user_metadata(conversation_id);

-- Función para actualizar last_updated
CREATE OR REPLACE FUNCTION update_last_updated()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar last_updated en conversations
CREATE TRIGGER update_conversations_last_updated
    BEFORE UPDATE ON conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_last_updated(); 