import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { signIn, register } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setError('')
    setPending(true)
    try {
      if (mode === 'login') await signIn(email, password)
      else await register(email, password)
      navigate('/subscriber', { replace: true })
    } catch (err) {
      setError(err.code === 'auth/invalid-credential' ? 'Identifiants invalides.' : 'Connexion impossible. Vérifiez vos informations et la configuration Firebase.')
    } finally {
      setPending(false)
    }
  }

  return <div className="grid min-h-screen place-items-center bg-[#080d1c] px-5 text-white">
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-7 shadow-xl">
      <Link to="/" className="text-lg font-bold text-violet-300">🌙 LiveWebMoon</Link>
      <h1 className="mt-6 text-2xl font-bold">{mode === 'login' ? 'Se connecter' : 'Créer mon compte'}</h1>
      <p className="mt-2 text-sm text-slate-400">Accédez à votre espace spectateur.</p>
      <form className="mt-6 space-y-4" onSubmit={submit}>
        <label className="block text-sm">Email<input required autoComplete="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white" /></label>
        <label className="block text-sm">Mot de passe<input required minLength={6} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white" /></label>
        {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
        <button disabled={pending} className="w-full rounded-xl bg-violet-600 p-3 font-semibold disabled:opacity-50">{pending ? 'Veuillez patienter…' : mode === 'login' ? 'Connexion' : 'Créer mon compte'}</button>
      </form>
      <button onClick={() => { setMode(value => value === 'login' ? 'register' : 'login'); setError('') }} className="mt-5 text-sm text-violet-300 hover:underline">{mode === 'login' ? "Pas encore de compte ? S'inscrire" : 'Déjà inscrit ? Se connecter'}</button>
    </div>
  </div>
}
