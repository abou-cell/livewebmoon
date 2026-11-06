import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabaseClient'

export default function CreatorSetup() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [owner, setOwner] = useState(null)
  const [key, setKey] = useState('')
  const [name, setName] = useState('')
  const [intro, setIntro] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) return
    supabase.from('creator_settings').select('owner_id,display_name').eq('id', true).maybeSingle()
      .then(({ data, error }) => { if (!error) setOwner(data || false) })
      .catch(() => setOwner(false))
  }, [])

  async function claim(event) {
    event.preventDefault()
    if (!user?.email_confirmed_at) { setError('Confirmez votre adresse email avant de créer votre studio.'); return }
    setBusy(true)
    setError('')
    try {
      const { data, error: invokeError } = await supabase.functions.invoke('bootstrap-owner', {
        body: { setupToken: key, displayName: name.trim(), introduction: intro.trim() },
      })
      if (invokeError) throw invokeError
      if (!data?.ok) throw new Error(data?.error || 'Initialisation indisponible.')
      navigate('/creator-admin', { replace: true })
    } catch (err) {
      setError('Initialisation impossible. Vérifiez la clé d’installation et le déploiement sécurisé de la fonction bootstrap-owner. ' + (err.message || ''))
    } finally { setBusy(false) }
  }

  if (loading) return <div className="grid min-h-screen place-items-center bg-[#fff8f8]">Connexion…</div>
  if (!user) return <Navigate to="/login" replace />
  return <div className="min-h-screen bg-[#fff8f8] px-5 py-14 text-[#342537]">
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-rose-100 bg-white p-8 shadow-xl shadow-rose-100/60 md:p-12">
      <Link to="/" className="text-sm font-semibold text-rose-500">♡ LiveWebMoon</Link>
      <p className="mt-9 text-xs font-bold uppercase tracking-[.25em] text-rose-400">Installation privée · étape 1/3</p>
      <h1 className="mt-3 font-serif text-4xl">Créez votre studio.</h1>
      <p className="mt-4 leading-relaxed text-slate-600">Votre espace, vos contenus, votre communauté. Ce studio est indépendant : l’administration appartient au créateur de cette installation, jamais aux abonnés.</p>
      {owner ? <div className="mt-8 rounded-2xl bg-amber-50 p-5 text-sm text-amber-900">Cette installation possède déjà un propriétaire. Une deuxième inscription propriétaire est impossible. {owner.owner_id === user.id && <Link to="/creator-admin" className="mt-3 block font-bold underline">Accéder à mon studio</Link>}</div> : <form onSubmit={claim} className="mt-8 space-y-5">
        <label className="block text-sm font-semibold">Nom public du studio<input required maxLength={80} value={name} onChange={e => setName(e.target.value)} placeholder="Ex. Studio Étoile" className="mt-2 w-full rounded-xl border border-rose-200 p-3 outline-rose-400" /></label>
        <label className="block text-sm font-semibold">Présentation<textarea maxLength={500} rows={3} value={intro} onChange={e => setIntro(e.target.value)} placeholder="Présentez-vous à votre communauté…" className="mt-2 w-full rounded-xl border border-rose-200 p-3 outline-rose-400" /></label>
        <label className="block text-sm font-semibold">Clé privée d’installation<input required type="password" autoComplete="off" value={key} onChange={e => setKey(e.target.value)} placeholder="Fourni à l’installation du serveur" className="mt-2 w-full rounded-xl border border-rose-200 p-3 outline-rose-400" /></label>
        <p className="text-xs text-slate-500">La clé est vérifiée côté serveur, n’est pas enregistrée dans le navigateur et ne doit jamais apparaître dans le code public. Il faut d’abord déployer la fonction sécurisée avec son secret.</p>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button disabled={busy || !name.trim() || !key.trim()} className="w-full rounded-xl bg-[#a73d73] px-5 py-4 font-bold text-white disabled:opacity-50">{busy ? 'Configuration en cours…' : 'Activer mon espace propriétaire'}</button>
      </form>}
      <div className="mt-8 border-t pt-6 text-sm text-slate-500"><p>Étapes suivantes : identité visuelle → Cloudflare Stream → paiements Stripe en mode test.</p><Link to="/" className="mt-3 inline-block text-rose-600 underline">Retour au site public</Link></div>
    </div>
  </div>
}
