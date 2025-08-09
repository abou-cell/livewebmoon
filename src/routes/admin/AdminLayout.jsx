import { NavLink, Outlet } from 'react-router-dom'

const menuItems = [
  { to: '/admin', label: '🏠 Dashboard', end: true },
  { to: '/admin/live', label: '📡 Live' },
  { to: '/admin/photos', label: '📷 Photos payantes' },
  { to: '/admin/videos', label: '🎞 Vidéos payantes' },
  { to: '/admin/credits', label: '💳 Crédits & Prix' },
  { to: '/admin/payments', label: '💶 Paiements & Payouts' },
  { to: '/admin/moderation', label: '🛡 Modération & Signalements' },
  { to: '/admin/logs', label: '🧾 Logs & Audit' },
  { to: '/admin/settings', label: '⚙️ Paramètres' },
  { to: '/admin/support', label: '🆘 Support' }
]

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-background text-gray-100">
      <aside className="w-64 h-screen bg-surface border-r border-gray-700 p-4 space-y-2" role="navigation">
        {menuItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `block w-full text-left px-3 py-2 rounded-lg transition-all hover:scale-[1.01] ${
                isActive ? 'bg-gray-700 shadow-lg font-medium' : 'hover:bg-gray-700'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm px-4 h-14 flex items-center justify-between sticky top-0 z-50 text-gray-800">
          <div className="flex items-center space-x-2">
            <div className="font-bold">🌙</div>
            <span className="font-semibold">LiveWebMoon</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center text-sm" title="Plateforme en ligne">
              <span className="mr-1">🟢</span> En ligne
            </div>
            <nav className="flex items-center gap-4 text-sm">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Page publique
              </a>
              <a
                href="/player-test"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Player test
              </a>
              <a
                href="/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Docs internes
              </a>
            </nav>
            <div className="relative">
              <button
                className="px-3 py-1 rounded-xl bg-gray-200"
                aria-haspopup="menu"
                aria-expanded="false"
              >
                Compte ▾
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-background text-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
