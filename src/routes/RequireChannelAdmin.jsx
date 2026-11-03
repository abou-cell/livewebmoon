import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function RequireChannelAdmin({ children }) {
  const { user, loading } = useAuth()
  const [state, setState] = useState('checking')

  useEffect(() => {
    let active = true
    if (!user) {
      setState('denied')
      return () => { active = false }
    }
    setState('checking')
    user.getIdTokenResult().then(result => {
      if (active) setState(result.claims.channelAdmin === true || result.claims.superAdmin === true ? 'allowed' : 'denied')
    }).catch(() => { if (active) setState('denied') })
    return () => { active = false }
  }, [user])

  if (loading || (user && state === 'checking')) return <div className="min-h-screen grid place-items-center bg-slate-950 text-white">Vérification des autorisations…</div>
  if (!user) return <Navigate to="/login" replace />
  if (state !== 'allowed') return <div className="min-h-screen grid place-items-center bg-slate-950 p-6 text-center text-white"><div><h1 className="text-xl font-bold">Accès administrateur refusé</h1><p className="mt-2 text-slate-400">Ce compte ne dispose pas du rôle channelAdmin. Contactez l'administrateur de la plateforme.</p></div></div>
  return children
}
