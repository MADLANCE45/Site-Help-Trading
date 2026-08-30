import { createClient } from '@supabase/supabase-js';

// In Vite DEVI usare import.meta.env e le variabili DEVONO iniziare con VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Variabili Supabase mancanti! Controlla Vercel o il file .env locale.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);