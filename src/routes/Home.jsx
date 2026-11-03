import { useState } from 'react'
import { Link } from 'react-router-dom'

const catalogue = [
  { id: 'replay-1', title: 'Les rendez-vous de la chaîne', category: 'Émissions', format: 'Replay', access: 'Gratuit', gradient: 'from-indigo-600 via-violet-700 to-slate-900', icon: '🎙️' },
  { id: 'replay-2', title: 'Rencontres & découvertes', category: 'Culture', format: 'Replay', access: 'Crédits', gradient: 'from-cyan-700 via-blue-700 to-slate-900', icon: '🌍' },
  { id: 'replay-3', title: 'Sessions exclusives', category: 'Exclusivités', format: 'À venir', access: 'Abonnement', gradient: 'from-fuchsia-700 via-purple-800 to-slate-900', icon: '✨' },
]

const filters = ['Tout', 'Gratuit', 'Crédits', 'Abonnement']

function AccessBadge({ access }) {
  const classes = access === 'Gratuit'
    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
    : access === 'Crédits'
      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      : 'bg-violet-500/15 text-violet-200 border-violet-500/30'
  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${classes}`}>{access}</span>
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('Tout')
  const visible = catalogue.filter(item => filter === 'Tout' || item.access === filter)

  return (
    <div className="min-h-screen bg-[#080d1c] text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a1021]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="flex items-center gap-3 font-bold tracking-wide" aria-label="LiveWebMoon accueil">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-600 text-xl">🌙</span>
            <span className="text-xl">Live<span className="text-violet-300">WebMoon</span></span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex" aria-label="Navigation principale">
            <a className="hover:text-white" href="#direct">Le direct</a>
            <a className="hover:text-white" href="#programmes">Programmes</a>
            <a className="hover:text-white" href="#offres">Accès & tarifs</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login" className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10">Se connecter</Link>
            <Link to="/subscriber" className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold hover:bg-violet-500">Mon espace</Link>
          </div>
          <button className="rounded-lg border border-white/15 px-3 py-2 md:hidden" aria-label="Ouvrir le menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>☰</button>
        </div>
        {menuOpen && (
          <nav className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 text-sm md:hidden" aria-label="Navigation mobile">
            <a href="#direct" onClick={() => setMenuOpen(false)}>Le direct</a>
            <a href="#programmes" onClick={() => setMenuOpen(false)}>Programmes</a>
            <a href="#offres" onClick={() => setMenuOpen(false)}>Accès & tarifs</a>
            <Link to="/login">Connexion</Link>
            <Link to="/subscriber">Mon espace</Link>
          </nav>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_80%_0%,rgba(110,65,220,0.35),transparent_60%)]">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
            <div className="space-y-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-xs font-semibold text-violet-200">● Votre chaîne Web TV, partout avec vous</span>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Une chaîne.<br /><span className="text-violet-300">Des expériences</span><br />à partager.</h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-300">Retrouvez le direct, les émissions en replay et des programmes exclusifs. Choisissez librement comment regarder : gratuitement, avec des crédits ou par abonnement.</p>
              <div className="flex flex-wrap gap-3">
                <a href="#direct" className="rounded-xl bg-violet-600 px-6 py-3 font-semibold hover:bg-violet-500">▶ Découvrir le direct</a>
                <a href="#programmes" className="rounded-xl border border-white/20 px-6 py-3 font-semibold hover:bg-white/10">Explorer les programmes</a>
              </div>
              <p className="text-sm text-slate-400">Le lecteur live et les paiements sont en cours d'intégration.</p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-violet-400/25 bg-slate-900 shadow-2xl shadow-violet-900/20">
              <div className="relative grid aspect-video place-items-center bg-gradient-to-br from-indigo-600 via-violet-800 to-slate-950">
                <div className="absolute left-5 top-5 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white">WEB TV</div>
                <div className="text-center"><div className="mb-3 text-7xl">🌙</div><div className="text-2xl font-bold tracking-wide">LiveWebMoon</div><div className="mt-2 text-sm text-violet-200">Votre prochain rendez-vous vidéo</div></div>
              </div>
              <div className="flex items-center justify-between gap-4 p-5"><div><p className="font-semibold">Notre chaîne</p><p className="text-sm text-slate-400">Diffusion à configurer</p></div><span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-200">Bientôt disponible</span></div>
            </div>
          </div>
        </section>

        <section id="direct" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-sm font-bold uppercase tracking-widest text-violet-300">La chaîne</p><h2 className="text-3xl font-bold">Regarder le direct</h2></div><span className="rounded-full border border-slate-700 px-4 py-2 text-xs text-slate-300">Hors antenne · démonstration</span></div>
          <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-slate-900 lg:grid-cols-[1.6fr_1fr]">
            <div className="grid aspect-video place-items-center bg-gradient-to-br from-slate-800 to-slate-950 text-center"><div className="p-6"><div className="mb-4 text-5xl">📺</div><p className="text-xl font-semibold">Le direct arrive bientôt</p><p className="mt-2 text-sm text-slate-400">Aucun flux vidéo n'est connecté pour le moment.</p></div></div>
            <div className="flex flex-col justify-center gap-4 p-7"><span className="text-sm font-semibold text-violet-300">Diffusion Web TV</span><h3 className="text-2xl font-bold">Une expérience pensée pour tous les écrans</h3><p className="text-sm leading-relaxed text-slate-300">La lecture en direct sera accessible depuis votre ordinateur, tablette ou téléphone, selon les droits de votre formule.</p><Link to="/subscriber" className="self-start rounded-xl border border-violet-400/40 px-5 py-3 text-sm font-semibold hover:bg-violet-500/10">Découvrir l'espace spectateur</Link></div>
          </div>
        </section>

        <section id="programmes" className="scroll-mt-24 border-y border-white/10 bg-[#0c1427] py-16">
          <div className="mx-auto max-w-7xl px-5"><div className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><p className="mb-2 text-sm font-bold uppercase tracking-widest text-violet-300">Catalogue</p><h2 className="text-3xl font-bold">Programmes à découvrir</h2></div><p className="text-xs text-slate-400">Catalogue illustratif, publications à venir</p></div>
            <div className="mb-7 flex flex-wrap gap-2" aria-label="Filtrer les programmes">{filters.map(value => <button key={value} onClick={() => setFilter(value)} aria-pressed={filter === value} className={`rounded-full px-4 py-2 text-sm transition ${filter === value ? 'bg-violet-600 text-white' : 'border border-white/15 text-slate-300 hover:bg-white/10'}`}>{value}</button>)}</div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visible.map(item => <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900"><div className={`grid aspect-video place-items-center bg-gradient-to-br ${item.gradient}`}><span className="text-6xl" aria-hidden="true">{item.icon}</span></div><div className="space-y-3 p-5"><div className="flex items-center justify-between gap-2"><span className="text-xs text-slate-400">{item.category} · {item.format}</span><AccessBadge access={item.access} /></div><h3 className="text-lg font-semibold">{item.title}</h3><p className="text-xs text-slate-400">Aperçu du futur catalogue</p></div></article>)}</div>
          </div>
        </section>

        <section id="offres" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16"><div className="mb-9 max-w-2xl"><p className="mb-2 text-sm font-bold uppercase tracking-widest text-violet-300">Votre liberté</p><h2 className="text-3xl font-bold">Trois façons de regarder</h2><p className="mt-3 text-slate-300">Une chaîne unique, plusieurs modes d'accès adaptés à chaque spectateur.</p></div>
          <div className="grid gap-5 md:grid-cols-3">
            {[{ icon: '🎁', title: 'Accès gratuit', description: 'Découvrez une sélection de programmes accessibles à tous.', details: 'Sans achat de crédits' }, { icon: '⚡', title: 'Crédits à la carte', description: 'Débloquez ponctuellement un contenu ou une durée de visionnage.', details: 'Paiement à l’usage' }, { icon: '💎', title: 'Abonnement', description: 'Profitez des programmes compris dans votre formule.', details: 'Accès récurrent' }].map(offer => <div key={offer.title} className="rounded-2xl border border-white/10 bg-slate-900 p-7"><div className="mb-5 text-4xl">{offer.icon}</div><h3 className="mb-3 text-xl font-bold">{offer.title}</h3><p className="min-h-[75px] text-sm leading-relaxed text-slate-300">{offer.description}</p><div className="mt-6 border-t border-white/10 pt-5 text-sm font-semibold text-violet-300">{offer.details}</div></div>)}
          </div><p className="mt-5 text-sm text-slate-400">Les tarifs et droits exacts seront définis avant l'activation des paiements.</p>
        </section>
      </main>
      <footer className="border-t border-white/10 bg-[#060a15] px-5 py-9"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4"><p className="font-bold">🌙 LiveWebMoon</p><p className="text-sm text-slate-400">Web TV · Direct, replay & exclusivités</p><Link to="/login" className="text-sm text-violet-300 hover:underline">Espace administrateur</Link></div></footer>
    </div>
  )
}
