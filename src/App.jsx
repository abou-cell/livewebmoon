import { Routes, Route, Link } from 'react-router-dom'
import Login from './routes/Login'
import Dashboard from './routes/Dashboard'
import StreamerPanel from './routes/StreamerPanel'
import StreamPlayer from './routes/StreamPlayer'

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <header className="max-w-xl text-center space-y-4">
        <h1 className="text-4xl font-bold">LiveWebMoon</h1>
        <p className="text-gray-600">
          Service de live vidéo — démo. Interface épurée, style Stripe-like.
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            to="/login"
            className="px-5 py-2 rounded-2xl bg-[#635BFF] text-white shadow-lg transition-all hover:scale-105"
          >
            Se connecter / S’inscrire
          </Link>
          <Link
            to="/dashboard"
            className="px-5 py-2 rounded-2xl bg-white border shadow-lg transition-all hover:scale-105"
          >
            Voir le tableau de bord
          </Link>
        </div>
      </header>

      {/* Aperçu du player (mock) */}
      <section className="mt-10 w-full max-w-3xl">
        <div className="rounded-2xl border shadow-lg aspect-video grid place-items-center">
          <span className="text-gray-500">Aperçu streaming (mock)</span>
        </div>
      </section>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/streamer" element={<StreamerPanel />} />
      <Route path="/watch/:id" element={<StreamPlayer />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
