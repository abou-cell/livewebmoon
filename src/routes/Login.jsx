import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { signIn, register, signInWithGoogle, configured } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [pending, setPending] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setError('')
    setNotice('')
    setPending(true)
    try {
      const data = mode === 'login' ? await signIn(email, password) : await register(email, password)
      if (mode === 'register' && !data.session) {
        setNotice('Compte créé. Consultez votre boîte email pour confirmer votre adresse avant de vous connecter.')
      } else {
        navigate('/subscriber', { replace: true })
      }
    } catch (err) {
      setError(err.message || 'Connexion impossible.')
    } finally {
      setPending(false)
    }
  }

  return <div className="grid min-h-screen place-items-center bg-[#fbf8f8] px-5 text-slate-900">
    <div className="w-full max-w-md rounded-3xl border border-rose-100 bg-white p-8 shadow-xl shadow-rose-100/50">
      <Link to="/" className="text-lg font-bold text-rose-600">♡ LiveWebMoon</Link>
      <h1 className="mt-6 text-2xl font-bold">{mode === 'login' ? 'Bienvenue' : 'Créer mon compte'}</h1>
      <p className="mt-2 text-sm text-slate-500">Retrouvez vos abonnements et les contenus réservés aux membres.</p>
      {!configured && <p role="alert" className="mt-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">Ce site n'est pas encore relié à Supabase. L'administrateur doit configurer les variables publiques de connexion.</p>}
      <form className="mt-6 space-y-4" onSubmit={submit}>
        <label className="block text-sm">Email<input required autoComplete="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-rose-100 bg-rose-50/40 p-3" /></label>
        <label className="block text-sm">Mot de passe<input required minLength={6} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-rose-100 bg-rose-50/40 p-3" /></label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        {notice && <p role="status" className="text-sm text-emerald-700">{notice}</p>}
        <button disabled={pending || !configured} className="w-full rounded-xl bg-rose-600 p-3 font-semibold text-white disabled:opacity-50">{pending ? 'Veuillez patienter…' : mode === 'login' ? 'Connexion' : 'Créer mon compte'}</button>
      </form>
      <button disabled={!configured} onClick={async () => { setError(''); try { await signInWithGoogle() } catch(e) { setError(e.message) } }} className="mt-4 w-full rounded-xl border border-slate-200 p-3 text-sm font-medium disabled:opacity-50">Continuer avec Google</button>
      <button onClick={() => { setMode(v => v === 'login' ? 'register' : 'login'); setError(''); setNotice('') }} className="mt-5 text-sm text-rose-600 hover:underline">{mode === 'login' ? "Pas encore de compte ? S'inscrire" : 'Déjà inscrit ? Se connecter'}</button>
    </div>
  </div>
}
