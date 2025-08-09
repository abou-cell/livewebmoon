import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import SecOpsBanner from './SecOpsBanner'

const LANG = navigator.language?.startsWith('fr') ? 'fr' : 'en'
const t = key => {
  const dict = {
    publicPage: { fr: 'Page publique', en: 'Public page' },
    testPlayer: { fr: 'Player test', en: 'Test player' },
    docs: { fr: 'Docs internes', en: 'Internal docs' },
    account: { fr: 'Compte', en: 'Account' },
    profile: { fr: 'Profil', en: 'Profile' },
    activity: { fr: "Journal d'activité", en: 'Activity log' },
    logout: { fr: 'Déconnexion', en: 'Logout' },
    statusOnline: { fr: 'En ligne', en: 'Online' }
  }
  return dict[key][LANG]
}

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
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handler = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="flex h-screen bg-background text-gray-100">
      <aside
        className="w-64 h-screen bg-surface border-r border-gray-700 p-4 space-y-2"
        role="navigation"
        aria-label="Admin"
      >
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
            <div className="flex items-center text-sm" title={t('statusOnline')}>
              <span className="mr-1">🟢</span> {t('statusOnline')}
            </div>
            <nav className="flex items-center gap-4 text-sm">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t('publicPage')}
              </a>
              <a
                href="/player-test"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t('testPlayer')}
              </a>
              <a
                href="/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t('docs')}
              </a>
            </nav>
            <div className="relative" ref={menuRef}>
              <button
                className="px-3 py-1 rounded-xl bg-gray-200"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(o => !o)}
                onKeyDown={e => {
                  if (e.key === 'Escape') setMenuOpen(false)
                }}
              >
                {t('account')} ▾
              </button>
              {menuOpen && (
                <div
                  className="absolute right-0 mt-1 bg-white border rounded shadow-lg text-gray-800"
                  role="menu"
                >
                  {[
                    { key: 'profile', href: '#profile' },
                    { key: 'activity', href: '#activity' },
                    { key: 'logout', href: '#logout' }
                  ].map(item => (
                    <a
                      key={item.key}
                      role="menuitem"
                      tabIndex={0}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          window.location.href = item.href
                        }
                      }}
                    >
                      {t(item.key)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <SecOpsBanner />

        <main className="flex-1 overflow-y-auto p-6 bg-background text-gray-100" role="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
