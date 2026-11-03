import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabaseClient'

export default function RequireChannelAdmin({ children }) {
  const { user, loading } = useAuth()
  const [check, setCheck] = useState({ id: null, allowed: false, pending: true })
  useEffect(() => {
    if (!user || !supabase) return
    let active = true
    supabase.from('creator_settings').select('owner_id').eq('id', true).maybeSingle()
      .then(({ data, error }) => {
        if (active) setCheck({ id: user.id, allowed: !error && data?.owner_id === user.id, pending: false })
      })
      .catch(() => { if (active) setCheck({ id: user.id, allowed: false, pending: false }) })
    return () => { active = false }
  }, [user])
  if (loading || (user && (check.id !== user.id || check.pending))) {
    return <div className="grid min-h-screen place-items-center">Vérification des autorisations…</div>
  }
  if (!user) return <Navigate to="/login" replace />
  if (!check.allowed) return <div className="grid min-h-screen place-items-center p-6"><div className="text-center"><h1 className="text-xl font-bold">Accès administrateur refusé</h1><p>Votre compte spectateur n'est pas propriétaire de cette chaîne.</p></div></div>
  return children
}
