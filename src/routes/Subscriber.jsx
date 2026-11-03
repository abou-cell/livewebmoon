import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabaseClient'

export default function Subscriber() {
  const { user, loading, logout } = useAuth()
  const [state, setState] = useState({ loading: true, plans: [], subscriptions: [], credits: null, error: '' })
  useEffect(() => {
    if (!user || !supabase) return
    let active = true
    Promise.all([
      supabase.from('membership_plans').select('id,title,description,price_cents,currency').eq('active', true),
      supabase.from('member_subscriptions').select('id,status,current_period_end,plan_id').eq('user_id', user.id),
      supabase.from('credit_ledger').select('delta').eq('user_id', user.id),
    ]).then(([plans, subs, ledger]) => {
      if (!active) return
      const error = [plans.error, subs.error, ledger.error].find(Boolean)
      setState({
        loading: false,
        plans: plans.data || [],
        subscriptions: subs.data || [],
        credits: ledger.data?.reduce((sum, item) => sum + item.delta, 0) ?? null,
        error: error?.message || '',
      })
    }).catch(err => { if (active) setState(s => ({ ...s, loading: false, error: err.message })) })
    return () => { active = false }
  }, [user])
  if (loading) return <div className="grid min-h-screen place-items-center">Chargement du compte…</div>
  if (!user) return <Navigate to="/login" replace />

  return <div className="min-h-screen bg-[#fbf8f8] text-slate-800">
    <header className="border-b border-rose-100 bg-white"><div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-5"><Link to="/" className="font-bold text-rose-600">♡ LiveWebMoon</Link><button className="rounded-xl border border-rose-200 px-4 py-2 text-sm" onClick={() => logout()}>Se déconnecter</button></div></header>
    <main className="mx-auto max-w-5xl space-y-8 px-5 py-12">
      <div><p className="text-xs font-bold uppercase tracking-widest text-rose-500">Espace membre</p><h1 className="mt-2 text-3xl font-bold">Bonjour, {user.email}</h1><p className="mt-2 text-slate-500">Vos abonnements et crédits proviennent de votre compte sécurisé.</p></div>
      {state.error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-700">{state.error}</p>}
      {state.loading ? <p>Chargement de vos droits…</p> : <div className="grid gap-5 md:grid-cols-2">
        <section className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm"><h2 className="font-semibold">Mes crédits</h2><p className="mt-3 text-4xl font-bold text-rose-600">{state.credits === null ? '—' : state.credits}</p><p className="mt-3 text-sm text-slate-500">Rechargement désactivé durant la préproduction. Aucun crédit fictif n'est attribué.</p></section>
        <section className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm"><h2 className="font-semibold">Mes abonnements</h2>{state.subscriptions.length ? state.subscriptions.map(s => <p className="mt-3 text-sm" key={s.id}>Statut : {s.status}{s.current_period_end ? ' · Jusqu’au ' + new Date(s.current_period_end).toLocaleDateString('fr-FR') : ''}</p>) : <p className="mt-3 text-sm text-slate-500">Aucun abonnement actif pour le moment.</p>}</section>
      </div>}
      <section className="rounded-2xl border border-rose-100 bg-white p-6"><h2 className="text-xl font-bold">Offres disponibles</h2>{state.plans.length ? <ul className="mt-4 space-y-3">{state.plans.map(p => <li key={p.id} className="rounded-xl bg-rose-50 p-4"><strong>{p.title}</strong><p className="text-sm">{p.description}</p><p className="mt-1 text-sm">{(p.price_cents / 100).toLocaleString('fr-FR',{style:'currency',currency:p.currency.toUpperCase()})}</p></li>)}</ul> : <p className="mt-3 text-sm text-slate-500">Les offres seront ajoutées par la propriétaire de la chaîne. Stripe est en mode test et les achats restent indisponibles.</p>}</section>
    </main>
  </div>
}
