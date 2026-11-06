import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { signIn, register, signInWithGoogle, resendConfirmation, configured } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [pending, setPending] = useState(false)
  const [resending, setResending] = useState(false)
  const [lastResendAt, setLastResendAt] = useState(0)

  async function submit(event) {
    event.preventDefault()
    setError('')
    setNotice('')
    setPending(true)
    try {
      const data = mode === 'login' ? await signIn(email.trim(), password) : await register(email.trim(), password)
      if (mode === 'register' && !data.session) {
        setMode('confirm')
        setNotice('Un email de confirmation a été demandé. Ouvrez le message le plus récent et cliquez une seule fois sur le lien. Revenez ensuite vous connecter ici.')
      } else {
        navigate('/subscriber', { replace: true })
      }
    } catch (err) {
      const unconfirmed = err.code === 'email_not_confirmed' || /email not confirmed/i.test(err.message || '')
      if (unconfirmed) {
        setMode('confirm')
        setError('Adresse email non confirmée. Vérifiez le dernier message de confirmation reçu, puis reconnectez-vous.')
      } else {
        setError(err.message || 'Connexion impossible.')
      }
    } finally {
      setPending(false)
    }
  }

  async function resendEmail() {
    setError('')
    setNotice('')
    if (!email.trim() || !email.trim().includes('@') || !email.trim().split('@')[1]?.includes('.')) {
      setError('Saisissez une adresse email valide ci-dessus pour recevoir un nouveau lien.')
      return
    }
    if (Date.now() - lastResendAt < 60000) {
      setError('Veuillez patienter 60 secondes avant une nouvelle demande.')
      return
    }
    setResending(true)
    try {
      await resendConfirmation(email.trim())
      setLastResendAt(Date.now())
      setMode('confirm')
      setNotice('Si votre compte attend une confirmation, un nouvel email a été demandé. Vérifiez aussi les spams et utilisez uniquement le lien du message le plus récent.')
    } catch (err) {
      setError(err.status === 429 ? 'Limite d’envoi Supabase atteinte. Patientez avant de réessayer ; ne cliquez pas plusieurs fois.' : err.message || 'Impossible de demander un nouvel email.')
    } finally {
      setResending(false)
    }
  }

  const confirming = mode === 'confirm'

  return <div className="grid min-h-screen place-items-center bg-[#fbf8f8] px-5 text-slate-900">
    <div className="w-full max-w-md rounded-3xl border border-rose-100 bg-white p-8 shadow-xl shadow-rose-100/50">
      <Link to="/" className="text-lg font-bold text-rose-600">♡ LiveWebMoon</Link>
      <h1 className="mt-6 text-2xl font-bold">{confirming ? 'Vérifiez votre boîte email' : mode === 'login' ? 'Bienvenue' : 'Créer mon compte'}</h1>
      <p className="mt-2 text-sm text-slate-500">{confirming ? 'Cliquez sur le lien du dernier email de confirmation, puis revenez vous connecter.' : 'Retrouvez vos abonnements et les contenus réservés aux membres.'}</p>
      {!configured && <p role="alert" className="mt-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">Supabase n'est pas encore configuré sur ce site.</p>}
      {confirming ? <div className="mt-6 space-y-4">
        <label className="block text-sm">Adresse email
          <input required autoComplete="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-rose-100 bg-rose-50/40 p-3" />
        </label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        {notice && <p role="status" className="text-sm text-emerald-700">{notice}</p>}
        <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600">Le lien ne fonctionne plus ? Patientez avant de demander un nouveau message. Plusieurs tentatives peuvent déclencher une limite temporaire de Supabase.</p>
      </div> : <form className="mt-6 space-y-4" onSubmit={submit}>
        <label className="block text-sm">Email<input required autoComplete="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-rose-100 bg-rose-50/40 p-3" /></label>
        <label className="block text-sm">Mot de passe<input required minLength={6} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-rose-100 bg-rose-50/40 p-3" /></label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        {notice && <p role="status" className="text-sm text-emerald-700">{notice}</p>}
        <button disabled={pending || !configured} className="w-full rounded-xl bg-rose-600 p-3 font-semibold text-white disabled:opacity-50">{pending ? 'Veuillez patienter…' : mode === 'login' ? 'Connexion' : 'Créer mon compte'}</button>
      </form>}
      <button type="button" disabled={!configured || resending || !email.trim()} onClick={resendEmail} className="mt-4 w-full rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm font-semibold text-rose-700 disabled:opacity-50">{resending ? 'Envoi en cours…' : 'Renvoyer le lien de confirmation'}</button>
      <p className="mt-2 text-xs text-slate-500">Un nouveau lien peut rendre les précédents inutilisables. Supabase limite le nombre d’emails envoyés.</p>
      {!confirming && <button disabled={!configured} onClick={async () => { setError(''); try { await signInWithGoogle() } catch(e) { setError(e.message) } }} className="mt-4 w-full rounded-xl border border-slate-200 p-3 text-sm font-medium disabled:opacity-50">Continuer avec Google</button>}
      <button onClick={() => { setMode(confirming ? 'login' : mode === 'login' ? 'register' : 'login'); setError(''); setNotice('') }} className="mt-5 text-sm text-rose-600 hover:underline">{confirming ? 'Revenir à la connexion' : mode === 'login' ? "Pas encore de compte ? S'inscrire" : 'Déjà inscrit ? Se connecter'}</button>
    </div>
  </div>
}
