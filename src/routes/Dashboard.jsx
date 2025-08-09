import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 space-y-6 bg-background text-gray-100">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tableau de bord</h1>
        <Link to="/" className="underline">Accueil</Link>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-700 bg-surface shadow-lg p-6">
          <div className="text-gray-400">Crédits disponibles</div>
          <div className="text-3xl font-bold mt-2">0</div>
          <button className="mt-4 px-4 py-2 rounded-xl bg-primary text-white">Recharger via Stripe</button>
        </div>

        <div className="rounded-2xl border border-gray-700 bg-surface shadow-lg p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Streams en ligne</h2>
          </div>
          <div className="rounded-xl border border-gray-700 p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">Demo Stream</div>
              <div className="text-sm text-gray-400">by streamer-001</div>
            </div>
            <Link to="/watch/demo" className="px-4 py-2 rounded-xl bg-surface border border-gray-700 shadow">
              Rejoindre un live
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
