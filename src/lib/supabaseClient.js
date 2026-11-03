import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Only the public publishable key belongs in the browser.
// Secret/service-role keys must be configured in a private backend.
export const isSupabaseConfigured = Boolean(url && key)
export const supabase = isSupabaseConfigured
  ? createClient(url, key, { auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true } })
  : null
