import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { signIn, register, signInWithGoogle, resendConfirmation, verifySignupCode, configured } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [pending, setPending] = useState(false)
  const [resending, setResending] = useState(false)
  const [lastResendAt, setLastResendAt] = useState(0)

  const emailNotConfirmed = error.includes('non confirmée')

  async function submit(event) {
    event.preventDefault()
    setError('')
    setNotice('')
    setPending(true)
    try {
      const data = mode === 'login' ? await signIn(email.trim(), password) : await register(email.trim(), password)
      if (mode === 'register' && !data.session) {
        setMode('verify')
        setNotice('Votre compte a été créé. Saisissez le code à 6 chiffres reçu par email. Si le mail contient encore uniquement un lien, le modèle Supabase doit être configuré.')
      } else {
        navigate('/subscriber', { replace: true })
      }
    } catch (err) {
      const unconfirmed = err.code === 'email_not_confirmed' || /email not confirmed/i.test(err.message || '')
      if (unconfirmed) {
        setMode('verify')
        setError('Adresse email non confirmée. Saisissez le code à 6 chiffres envoyé par Supabase ou demandez un nouvel email.')
      } else {
        setError(err.message || 'Connexion impossible.')
      }
    } finally {
      setPending(false)
    }
  }

  async function verifyCode(event) {
    event.preventDefault()
    setError('')
    setNotice('')
    if (!/[0-9]{6}/.test(code) || code.length !== 6) {
      setError('Saisissez exactement les 6 chiffres de votre email.')
      return
    }
    setPending(true)
    try {
      const data = await verifySignupCode(email.trim(), code)
      if (data?.session) {
        setNotice('Votre adresse email est confirmée. Connexion réussie !')
        navigate('/subscriber', { replace: true })
      } else {
        setMode('login')
        setNotice('Adresse confirmée. Vous pouvez maintenant vous connecter.')
      }
    } catch (err) {
      setError(/expired|invalid|otp/i.test(err.message || '')
        ? 'Code incorrect ou expiré. Vérifiez le dernier email reçu ou demandez un nouveau code.'
        : err.message || 'Impossible de confirmer votre adresse email.')
    } finally {
      setPending(false)
    }
  }

  async function resendEmail() {
    setError('')
    setNotice('')
    if (!email.trim() || !email.trim().includes('@') || !email.trim().split('@')[1]?.includes('.')) {
      setError('Saisissez une adresse email valide ci-dessus pour recevoir un nouveau code.')
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
      setMode('verify')
      setNotice('Si votre compte attend une confirmation, un nouvel email vient d’être demandé. Utilisez uniquement le dernier code reçu et vérifiez vos spams.')
    } catch (err) {
      setError(err.status === 429 ? 'Limite d’envoi Supabase atteinte. Patientez avant de réessayer ; ne cliquez pas plusieurs fois.' : err.message || 'Impossible de demander un nouvel email.')
    } finally {
      setResending(false)
    }
  }

  const verifying = mode === 'verify'

  return <div className="grid min-h-screen place-items-center bg-[#fbf8f8] px-5 text-slate-900">
    <div className="w-full max-w-md rounded-3xl border border-rose-100 bg-white p-8 shadow-xl shadow-rose-100/50">
      <Link to="/" className="text-lg font-bold text-rose-600">♡ LiveWebMoon</Link>
      <h1 className="mt-6 text-2xl font-bold">{verifying ? 'Confirmer mon email' : mode === 'login' ? 'Bienvenue' : 'Créer mon compte'}</h1>
      <p className="mt-2 text-sm text-slate-500">{verifying ? 'Entrez le code à 6 chiffres envoyé à votre adresse email.' : 'Retrouvez vos abonnements et les contenus réservés aux membres.'}</p>
      {!configured && <p role="alert" className="mt-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">Supabase n'est pas encore configuré sur ce site.</p>}
      {verifying ? <form className="mt-6 space-y-4" onSubmit={verifyCode}>
        <label className="block text-sm">Adresse email
          <input required autoComplete="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-rose-100 bg-rose-50/40 p-3" />
        </label>
        <label className="block text-sm">Code de confirmation
          <input required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" placeholder="000000" value={code} onChange={e => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))} className="mt-2 w-full rounded-xl border border-rose-100 bg-rose-50/40 p-3 text-center text-2xl tracking-[.5em]" />
        </label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        {notice && <p role="status" className="text-sm text-emerald-700">{notice}</p>}
        <button disabled={pending || !configured || code.length !== 6} className="w-full rounded-xl bg-rose-600 p-3 font-semibold text-white disabled:opacity-50">{pending ? 'Vérification…' : 'Valider mon code'}</button>
      </form> : <form className="mt-6 space-y-4" onSubmit={submit}>
        <label className="block text-sm">Email<input required autoComplete="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-rose-100 bg-rose-50/40 p-3" /></label>
        <label className="block text-sm">Mot de passe<input required minLength={6} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-rose-100 bg-rose-50/40 p-3" /></label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        {notice && <p role="status" className="text-sm text-emerald-700">{notice}</p>}
        <button disabled={pending || !configured} className="w-full rounded-xl bg-rose-600 p-3 font-semibold text-white disabled:opacity-50">{pending ? 'Veuillez patienter…' : mode === 'login' ? 'Connexion' : 'Créer mon compte'}</button>
      </form>}
      <button type="button" disabled={!configured || resending} onClick={resendEmail} className="mt-4 w-full rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm font-semibold text-rose-700 disabled:opacity-50">{resending ? 'Envoi en cours…' : 'Renvoyer un code de confirmation'}</button>
      <p className="mt-2 text-xs text-slate-500">Un nouveau code annule l’ancien. Supabase limite le nombre d’emails envoyés.</p>
      {!verifying && <button disabled={!configured} onClick={async () => { setError(''); try { await signInWithGoogle() } catch(e) { setError(e.message) } }} className="mt-4 w-full rounded-xl border border-slate-200 p-3 text-sm font-medium disabled:opacity-50">Continuer avec Google</button>}
      <button onClick={() => { setMode(verifying ? 'login' : mode === 'login' ? 'register' : 'login'); setError(''); setNotice(''); setCode('') }} className="mt-5 text-sm text-rose-600 hover:underline">{verifying ? 'Revenir à la connexion' : mode === 'login' ? "Pas encore de compte ? S'inscrire" : 'Déjà inscrit ? Se connecter'}</button>
      {!verifying && !emailNotConfirmed && <button onClick={() => { setMode('verify'); setError(''); setNotice('') }} className="mt-3 block text-xs text-slate-500 hover:underline">J’ai déjà un code à 6 chiffres</button>}
    </div>
  </div>
}
