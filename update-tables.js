require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function updateTables() {
  try {
    // Leer el archivo SQL
    const sql = fs.readFileSync('./supabase/migrations/20240110_update_tables.sql', 'utf8');
    
    // Ejecutar las modificaciones
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      console.error('Error al actualizar las tablas:', error);
      return;
    }
    
    console.log('Tablas actualizadas exitosamente');
  } catch (error) {
    console.error('Error:', error);
  }
}

updateTables(); 