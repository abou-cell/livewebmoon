import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabaseClient'

const sections = [ ['feed','♡','Fil & découvertes'], ['photos','▧','Photos'], ['videos','▷','Vidéos'], ['live','◉','Live'], ['credits','◇','Mes crédits'], ['membership','✦','Abonnement'], ['messages','✉','Messages'] ]
const cards = [ {title:'Photos exclusives', subtitle:'Galerie privée', color:'from-[#f6d4dc] to-[#a97599]', icon:'▧'}, {title:'Mes vidéos', subtitle:'Moments partagés', color:'from-[#d8c7dd] to-[#866f9a]', icon:'▷'}, {title:'En direct', subtitle:'Chat & rencontres', color:'from-[#f1dacb] to-[#b78b93]', icon:'◉'} ]

export default function MemberHub() {
  const { user, loading, logout } = useAuth()
  const [tab,setTab] = useState('feed')
  const [creator,setCreator] = useState(null)
  const [state,setState] = useState({ loading:true, plans:[], subs:[], credits:0, error:'' })
  useEffect(() => {
    if (!supabase || !user) return
    let active = true
    Promise.all([
      supabase.from('creator_settings').select('display_name,introduction').eq('id',true).maybeSingle(),
      supabase.from('membership_plans').select('id,title,description,price_cents,currency').eq('active',true),
      supabase.from('member_subscriptions').select('id,status,current_period_end').eq('user_id',user.id),
      supabase.from('credit_ledger').select('delta').eq('user_id',user.id),
    ]).then(([creatorResult,plans,subs,ledger]) => {
      if (!active) return
      if (!creatorResult.error) setCreator(creatorResult.data)
      setState({ loading:false, plans:plans.data||[], subs:subs.data||[], credits:(ledger.data||[]).reduce((a,x)=>a+x.delta,0), error:[creatorResult,plans,subs,ledger].find(x=>x.error)?.error?.message||'' })
    }).catch(error=>{if(active)setState(s=>({...s,loading:false,error:error.message}))})
    return ()=>{active=false}
  },[user])
  if (loading) return <div className="grid min-h-screen place-items-center bg-[#fffaf9]">Chargement…</div>
  if (!user) return <Navigate to="/login" replace />
  const activeSubs = state.subs.filter(s=>['active','trialing'].includes(s.status))
  return <div className="min-h-screen bg-[#fff9f8] text-[#372a3b]">
    <header className="sticky top-0 z-30 border-b border-rose-100 bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4"><Link to="/" className="font-serif text-2xl font-bold text-[#a24573]">♡ {creator?.display_name||'LiveWebMoon'}</Link><div className="flex items-center gap-3"><Link to="/" className="hidden text-sm text-[#786578] sm:block">Voir le profil public</Link><button onClick={()=>logout()} className="rounded-full border border-rose-200 px-4 py-2 text-xs">Déconnexion</button></div></div></header>
    <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[245px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start"><div className="rounded-[1.7rem] border border-rose-100 bg-white p-5"><div className="grid h-14 w-14 place-items-center rounded-full bg-[#f2d7e4] font-serif text-2xl text-[#974771]">♡</div><p className="mt-4 truncate font-semibold">{user.email}</p><p className="mt-1 text-xs text-slate-500">{activeSubs.length?'Membre du club privé':'Membre · Accès gratuit'}</p><nav className="mt-6 grid grid-cols-2 gap-1 lg:grid-cols-1">{sections.map(([id,icon,label])=><button key={id} onClick={()=>setTab(id)} className={`rounded-xl px-3 py-3 text-left text-xs font-semibold md:text-sm ${tab===id?'bg-[#fae8ee] text-[#a24573]':'text-[#786578] hover:bg-rose-50'}`}><span className="mr-2 text-lg">{icon}</span>{label}</button>)}</nav></div><Link to="/" className="mt-4 block rounded-xl border border-rose-100 p-4 text-center text-xs text-[#a24573]">← Retour au profil de la créatrice</Link></aside>
      <main className="min-w-0 space-y-7"><div className="rounded-[2rem] bg-gradient-to-r from-[#a45b86] via-[#c68da7] to-[#e7b7c4] p-8 text-white md:p-10"><p className="text-xs uppercase tracking-[.28em] text-white/80">Votre espace privilégié</p><h1 className="mt-4 font-serif text-4xl md:text-5xl">Bienvenue au club ♡</h1><p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90">Retrouvez ici les photos, vidéos et directs partagés par la créatrice, selon votre formule d'accès.</p><div className="mt-7 flex flex-wrap gap-3 text-xs"><span className="rounded-full bg-white/20 px-4 py-2">◇ {state.credits} crédit(s)</span><span className="rounded-full bg-white/20 px-4 py-2">✦ {activeSubs.length?'Abonnement actif':'Accès gratuit'}</span></div></div>
        {state.error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{state.error}</p>}
        {state.loading ? <p>Chargement des droits d'accès…</p> : <>
          {['feed','photos','videos','live'].includes(tab) && <section><div className="mb-5 flex items-end justify-between gap-3"><div><p className="text-xs uppercase tracking-widest text-[#ac6788]">Votre découverte</p><h2 className="mt-2 font-serif text-3xl">{tab==='feed'?'À la une':sections.find(s=>s[0]===tab)?.[2]}</h2></div><span className="text-xs text-slate-500">Publications à venir</span></div><div className="grid gap-4 md:grid-cols-3">{cards.filter(c=>tab==='feed'||(tab==='photos'&&c.icon==='▧')||(tab==='videos'&&c.icon==='▷')||(tab==='live'&&c.icon==='◉')).map(c=><article key={c.title} className="overflow-hidden rounded-[1.5rem] border border-rose-100 bg-white"><div className={`grid aspect-[4/4] place-items-center bg-gradient-to-br ${c.color} text-7xl text-white/80`}>{c.icon}</div><div className="p-5"><h3 className="font-serif text-xl">{c.title}</h3><p className="mt-1 text-sm text-slate-500">{c.subtitle}</p><p className="mt-4 text-xs text-[#a45a7c]">En attente de publication sécurisée</p></div></article>)}</div><p className="mt-5 text-sm text-slate-500">Les contenus privés ne sont pas simulés : ils seront visibles lorsque la créatrice aura connecté son stockage et publié du contenu avec des droits contrôlés côté serveur.</p></section>}
          {tab==='credits' && <section className="rounded-[1.7rem] border border-rose-100 bg-white p-8"><h2 className="font-serif text-3xl">Mes crédits</h2><p className="mt-6 text-5xl font-semibold text-[#a24573]">{state.credits}</p><p className="mt-4 text-sm text-slate-500">Le paiement Stripe et l'attribution de crédits exigent une validation serveur. Aucun crédit fictif ne sera attribué.</p><button disabled className="mt-7 rounded-full bg-[#a24573] px-7 py-3 text-sm font-bold text-white opacity-50">Recharger mes crédits · bientôt</button></section>}
          {tab==='membership' && <section className="space-y-5"><h2 className="font-serif text-3xl">Mon abonnement</h2><div className="rounded-2xl border border-rose-100 bg-white p-6"><p className="font-semibold">{activeSubs.length?'Abonnement actif':'Formule découverte'}</p><p className="mt-2 text-sm text-slate-500">{activeSubs.length?'Vos droits sont récupérés depuis Supabase.':'Vous pouvez découvrir les contenus gratuits. Les offres payantes seront activées après la configuration Stripe.'}</p></div>{state.plans.length?state.plans.map(p=><article key={p.id} className="rounded-2xl border border-rose-100 bg-white p-6"><h3 className="font-serif text-2xl">{p.title}</h3><p className="mt-2 text-sm text-slate-500">{p.description}</p><p className="mt-3 text-xl font-bold text-[#a24573]">{(p.price_cents/100).toLocaleString('fr-FR',{style:'currency',currency:p.currency.toUpperCase()})}</p><p className="mt-2 text-xs text-slate-500">Paiement bientôt disponible</p></article>):<p className="rounded-xl bg-rose-50 p-5 text-sm text-[#865975]">La créatrice n'a pas encore publié de formule payante.</p>}</section>}
          {tab==='messages' && <section className="rounded-[1.7rem] border border-rose-100 bg-white p-8"><h2 className="font-serif text-3xl">Messages privés ♡</h2><p className="mt-5 text-sm text-slate-500">La messagerie sera disponible après activation du service temps réel et vérification des droits de votre abonnement. Aucune conversation fictive n'est affichée.</p></section>}
        </>}
      </main>
    </div>
  </div>
}
