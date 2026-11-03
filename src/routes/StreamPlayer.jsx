import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { isTrustedPlaybackUrl } from './ChannelWatchAccess'

export default function StreamPlayer() {
  const { id } = useParams()
  const { user, loading: authLoading } = useAuth()
  const [state, setState] = useState({ status: 'loading' })

  useEffect(() => {
    if (authLoading) return
    const controller = new AbortController()
    async function checkAccess() {
      setState({ status: 'loading' })
      try {
        const headers = {}
        if (user) headers.Authorization = `Bearer ${await user.getIdToken()}`
        const response = await fetch(`/api/watch/${encodeURIComponent(id)}/access`, { headers, signal: controller.signal, cache: 'no-store' })
        const payload = await response.json()
        if (!response.ok || !payload.allowed) {
          setState({ status: 'locked', message: payload.reason || 'Ce programme nécessite un accès valide.' })
          return
        }
        if (!isTrustedPlaybackUrl(payload.playbackUrl)) {
          setState({ status: 'error', message: 'Le serveur n’a pas fourni de lecteur sécurisé valide.' })
          return
        }
        setState({ status: 'allowed', url: payload.playbackUrl, access: payload.access })
      } catch (error) {
        if (error.name !== 'AbortError') setState({ status: 'error', message: 'Le service vidéo est indisponible. Réessayez plus tard.' })
      }
    }
    checkAccess()
    return () => controller.abort()
  }, [authLoading, user, id])

  return <main className="min-h-screen bg-[#080d1c] px-5 py-8 text-white">
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4"><Link to="/" className="text-xl font-bold text-violet-300">🌙 LiveWebMoon</Link><Link to="/subscriber" className="rounded-xl border border-white/20 px-4 py-2 text-sm">Mon espace</Link></header>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-bold">Lecture du programme</h1><span className="rounded-full border border-white/20 px-3 py-1 text-xs text-slate-300">Accès contrôlé</span></div>
      <div className="grid aspect-video place-items-center overflow-hidden rounded-2xl border border-white/10 bg-black">
        {state.status === 'allowed' ? <iframe title="Lecteur vidéo sécurisé" src={state.url} className="h-full w-full" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <div className="max-w-lg px-6 text-center"><div className="mb-4 text-5xl">📺</div><p className="text-lg font-semibold">{state.status === 'loading' ? 'Vérification de votre accès…' : state.status === 'locked' ? 'Accès requis' : 'Lecture indisponible'}</p><p className="mt-3 text-sm text-slate-400">{state.message || 'Vérification des droits auprès du serveur.'}</p>{state.status === 'locked' && <Link to="/subscriber" className="mt-5 inline-block rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold">Voir mes accès</Link>}</div>}
      </div>
      <div className="mt-5 rounded-xl border border-white/10 bg-slate-900 p-5 text-sm text-slate-300">
        {state.status === 'allowed' ? `Accès validé : ${state.access || 'programme'}.` : 'Les contenus payants ne sont jamais déverrouillés par un simple clic local.'} Pour les crédits à la minute, le décompte doit être confirmé par le serveur avant activation commerciale.
      </div>
    </div>
  </main>
}
