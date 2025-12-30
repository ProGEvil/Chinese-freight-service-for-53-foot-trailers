
import { createClient } from '@supabase/supabase-js';

// Helper to safely get environment variables from Vite or Process
const getEnvVar = (key: string) => {
  let val = '';
  try {
    // Check Vite environment
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      val = import.meta.env[key];
    }
  } catch (e) {
    // ignore
  }
  
  if (!val) {
    try {
      // Check Node/Process environment fallback
      // @ts-ignore
      if (typeof process !== 'undefined' && process.env) {
        // @ts-ignore
        val = process.env[key];
      }
    } catch (e) {
      // ignore
    }
  }
  return val;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

// Export a flag to check if DB is connected
export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;

if (!isSupabaseConfigured) {
  console.warn('Supabase environment variables missing. App will run in Demo Mode with local data.');
}

// Fallback to placeholder to prevent crash during initialization
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);
