-- Modificaciones a la tabla conversations
ALTER TABLE conversations
ADD COLUMN IF NOT EXISTS topic TEXT,
ADD COLUMN IF NOT EXISTS is_lead BOOLEAN DEFAULT false;

-- Modificaciones a la tabla messages
ALTER TABLE messages
ADD COLUMN IF NOT EXISTS sentiment TEXT;

-- Modificaciones a la tabla user_metadata
ALTER TABLE user_metadata
ADD COLUMN IF NOT EXISTS device_type TEXT,
ADD COLUMN IF NOT EXISTS browser TEXT;
