import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'http://localhost',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'missing-key',
  { auth: { flowType: 'pkce' } }
)
export const redirectTo = window.location.origin + import.meta.env.BASE_URL
