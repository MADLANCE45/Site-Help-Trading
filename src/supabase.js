import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Manca la configurazione di Supabase nel file .env!");
}

// Esportiamo il client per usarlo in tutta l'app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);