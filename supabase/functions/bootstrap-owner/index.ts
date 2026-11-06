import { createClient } from 'npm:@supabase/supabase-js@2.57.0'

const cors = {
  'Access-Control-Allow-Origin': Deno.env.get('PUBLIC_SITE_ORIGIN') || 'https://abou-cell.github.io',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const respond = (status: number, body: object) => new Response(JSON.stringify(body), {
  status, headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
})

function equalSecrets(a: string, b: string) {
  // Constant-time comparison on encoded bytes, including unequal lengths.
  const x = new TextEncoder().encode(a)
  const y = new TextEncoder().encode(b)
  let diff = x.length ^ y.length
  const length = Math.max(x.length, y.length)
  for (let i = 0; i < length; i++) diff |= (x[i] || 0) ^ (y[i] || 0)
  return diff === 0
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors })
  if (req.method !== 'POST') return respond(405, { error: 'Method not allowed' })
  const expected = Deno.env.get('OWNER_SETUP_TOKEN')
  const url = Deno.env.get('SUPABASE_URL')
  const secret = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!expected || expected.length < 32 || !url || !secret) return respond(503, { error: 'Owner onboarding is not provisioned' })
  const bearer = req.headers.get('Authorization')?.match(/^Bearer (.+)$/i)?.[1]
  if (!bearer) return respond(401, { error: 'Sign in first' })
  const admin = createClient(url, secret, { auth: { persistSession: false } })
  const { data: { user }, error: authError } = await admin.auth.getUser(bearer)
  if (authError || !user?.email_confirmed_at) return respond(403, { error: 'Verified email required' })
  let payload: { setupToken?: string, displayName?: string, introduction?: string }
  try { payload = await req.json() } catch { return respond(400, { error: 'Invalid request' }) }
  if (!equalSecrets(payload.setupToken || '', expected)) return respond(403, { error: 'Invalid installation key' })
  const name = payload.displayName?.trim().slice(0, 80)
  if (!name) return respond(400, { error: 'Studio name required' })
  const { error } = await admin.from('creator_settings').insert({
    id: true, owner_id: user.id, display_name: name,
    introduction: payload.introduction?.trim().slice(0, 500) || '',
  })
  // The single-row primary key prevents concurrent claims. Never update an existing owner.
  if (error) return respond(error.code === '23505' ? 409 : 500, {
    error: error.code === '23505' ? 'This installation already has a creator' : 'Unable to initialize the studio',
  })
  return respond(200, { ok: true })
})
