import { useState } from 'react'

const menuItems = [
  { key: 'dashboard', label: '🏠 Dashboard' },
  { key: 'live', label: '📡 Live' },
  { key: 'photos', label: '📷 Photos payantes' },
  { key: 'videos', label: '🎞 Vidéos payantes' },
  { key: 'credits', label: '💳 Crédits & Prix' },
  { key: 'payments', label: '💶 Paiements & Payouts' },
  { key: 'moderation', label: '🛡 Modération & Signalements' },
  { key: 'logs', label: '🧾 Logs & Audit' },
  { key: 'settings', label: '⚙️ Paramètres' },
  { key: 'support', label: '🆘 Support' }
]

function DashboardSection() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="rounded-2xl shadow-lg p-5 bg-white">
          <div className="text-3xl">👀</div>
          <div className="mt-2 text-sm text-gray-600">Viewers en live (now)</div>
          <div className="text-2xl font-bold">0</div>
        </div>
        <div className="rounded-2xl shadow-lg p-5 bg-white">
          <div className="text-3xl">⏱</div>
          <div className="mt-2 text-sm text-gray-600">Burn rate crédits/min</div>
          <div className="text-2xl font-bold">0</div>
        </div>
        <div className="rounded-2xl shadow-lg p-5 bg-white">
          <div className="text-3xl">💰</div>
          <div className="mt-2 text-sm text-gray-600">Revenus 24h</div>
          <div className="text-2xl font-bold">0€</div>
        </div>
        <div className="rounded-2xl shadow-lg p-5 bg-white">
          <div className="text-3xl">🛒</div>
          <div className="mt-2 text-sm text-gray-600">Conversion visites → achat</div>
          <div className="text-2xl font-bold">0%</div>
        </div>
        <div className="rounded-2xl shadow-lg p-5 bg-white">
          <div className="text-3xl">🔓</div>
          <div className="mt-2 text-sm text-gray-600">Déblocages 24h</div>
          <div className="text-2xl font-bold">0</div>
        </div>
        <div className="rounded-2xl shadow-lg p-5 bg-white">
          <div className="text-3xl">⚠️</div>
          <div className="mt-2 text-sm text-gray-600">Signalements ouverts</div>
          <div className="text-2xl font-bold">0</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl shadow-lg p-5 bg-white h-64">Graphique crédits dépensés (placeholder)</div>
        <div className="rounded-2xl shadow-lg p-5 bg-white h-64">ARPM du live (placeholder)</div>
      </div>
      <div className="rounded-2xl shadow-lg p-5 bg-white h-64">Top contenus (placeholder)</div>
    </div>
  )
}

function Placeholder({ title }) {
  return (
    <div className="rounded-2xl shadow-lg p-5 bg-white">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">Contenu à implémenter</p>
    </div>
  )
}

export default function SuperAdmin() {
  const [active, setActive] = useState('dashboard')

  return (
    <div className="flex h-screen">
      <aside className="w-64 h-screen bg-gray-50 border-r p-4 space-y-2">
        {menuItems.map(item => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-all hover:scale-[1.01] ${
              active === item.key ? 'bg-white shadow-lg' : 'hover:bg-gray-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="font-bold">🌙</div>
            <span className="font-semibold">LiveWebMoon</span>
          </div>
          <div className="flex items-center gap-6">
            <span>🟢 En ligne</span>
            <nav className="flex items-center gap-4 text-sm">
              <a href="#" className="text-primary hover:underline">Page publique</a>
              <a href="#" className="text-primary hover:underline">Player test</a>
              <a href="#" className="text-primary hover:underline">Docs internes</a>
            </nav>
            <div className="relative">
              <button className="px-3 py-1 rounded-xl bg-gray-100">Compte ▾</button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {active === 'dashboard' && <DashboardSection />}
          {active === 'live' && <Placeholder title="Live" />}
          {active === 'photos' && <Placeholder title="Photos payantes" />}
          {active === 'videos' && <Placeholder title="Vidéos payantes" />}
          {active === 'credits' && <Placeholder title="Crédits & Prix" />}
          {active === 'payments' && <Placeholder title="Paiements & Payouts" />}
          {active === 'moderation' && <Placeholder title="Modération & Signalements" />}
          {active === 'logs' && <Placeholder title="Logs & Audit" />}
          {active === 'settings' && <Placeholder title="Paramètres" />}
          {active === 'support' && <Placeholder title="Support" />}
        </main>
      </div>
    </div>
  )
}

