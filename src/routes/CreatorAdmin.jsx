import { useState } from 'react'

const menuItems = [
  { key: 'dashboard', label: '🏠 Dashboard' },
  { key: 'photos', label: '📸 Photos payantes' },
  { key: 'videos', label: '🎞 Vidéos payantes' },
  { key: 'live', label: '📡 Mon Live' },
  { key: 'revenues', label: '💶 Revenus & Virements' },
  { key: 'stats', label: '📈 Statistiques' },
  { key: 'history', label: '🧾 Historique achats' },
  { key: 'messages', label: '📬 Messages / Support' },
  { key: 'profile', label: '⚙️ Mon profil' }
]

function KpiCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <div className="text-2xl">{icon}</div>
      <div className="mt-2 text-sm text-gray-600">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  )
}

function DashboardSection() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <KpiCard icon="📷" title="Photos publiées" value="0" />
        <KpiCard icon="🎞" title="Vidéos publiées" value="0" />
        <KpiCard icon="👀" title="Vues totales (30 j)" value="0" />
        <KpiCard icon="💳" title="Crédits générés (24 h)" value="0€" />
        <KpiCard icon="📡" title="Live maintenant ?" value="❌" />
      </div>
      <div className="flex flex-wrap gap-4">
        <button className="px-4 py-2 rounded-xl bg-[#635BFF] text-white shadow hover:scale-[1.01] transition-all">➕ Importer photos</button>
        <button className="px-4 py-2 rounded-xl bg-[#635BFF] text-white shadow hover:scale-[1.01] transition-all">➕ Importer vidéos</button>
        <button className="px-4 py-2 rounded-xl bg-[#635BFF] text-white shadow hover:scale-[1.01] transition-all">🎬 Démarrer un live test</button>
        <button className="px-4 py-2 rounded-xl bg-white border shadow hover:scale-[1.01] transition-all">🔁 Regénérer Stream Key</button>
        <button className="px-4 py-2 rounded-xl bg-white border shadow hover:scale-[1.01] transition-all">🔖 Créer un pack promo</button>
        <button className="px-4 py-2 rounded-xl bg-white border shadow hover:scale-[1.01] transition-all">💳 Ouvrir Checkout test</button>
      </div>
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

export default function CreatorAdmin() {
  const [active, setActive] = useState('dashboard')

  return (
    <div className="flex">
      <aside className="fixed w-64 h-screen bg-gray-50 border-r p-4 space-y-2">
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

      <div className="ml-64 flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-14 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="font-bold">🌙</div>
            <span className="font-semibold">LiveWebMoon</span>
          </div>
          <div className="flex items-center gap-6">
            <span>🟢 En ligne · 0€ aujourd'hui</span>
            <div className="relative">
              <button className="px-3 py-1 rounded-xl bg-gray-100">Profil ▾</button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {active === 'dashboard' && <DashboardSection />}
          {active === 'photos' && <Placeholder title="Photos payantes" />}
          {active === 'videos' && <Placeholder title="Vidéos payantes" />}
          {active === 'live' && <Placeholder title="Mon Live" />}
          {active === 'revenues' && <Placeholder title="Revenus & Virements" />}
          {active === 'stats' && <Placeholder title="Statistiques" />}
          {active === 'history' && <Placeholder title="Historique achats" />}
          {active === 'messages' && <Placeholder title="Messages / Support" />}
          {active === 'profile' && <Placeholder title="Mon profil" />}
        </main>
      </div>
    </div>
  )
}

