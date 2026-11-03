import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function RequireSuperAdmin({ children }) {
  const { user, loading } = useAuth()
  const [allowed, setAllowed] = useState(null)
  useEffect(() => {
    let active = true
    setAllowed(null)
    if (user) user.getIdTokenResult().then(result => {
      if (active) setAllowed(result.claims.superAdmin === true)
    }).catch(() => { if (active) setAllowed(false) })
    return () => { active = false }
  }, [user])
  if (loading || (user && allowed === null)) return <div className="grid min-h-screen place-items-center bg-slate-950 text-white">Vérification des autorisations…</div>
  if (!user) return <Navigate to="/login" replace />
  if (!allowed) return <Navigate to="/" replace />
  return children
}
