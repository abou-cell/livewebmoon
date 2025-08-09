import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ranges = [
  { value: '24h', label: '24h' },
  { value: '7d', label: '7j' },
  { value: '30d', label: '30j' },
]

export default function Dashboard() {
  const [range, setRange] = useState('24h')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    axios
      .get(`/api/admin/dashboard?range=${range}`)
      .then(res => {
        if (active) setData(res.data)
      })
      .catch(() => {
        if (active) setError('Erreur de chargement')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [range])

  const exportCsv = () => {
    window.open(`/api/admin/dashboard/export?range=${range}`, '_blank')
  }

  let content
  if (loading) {
    content = <div className="text-center py-10 text-gray-400">Chargement...</div>
  } else if (error) {
    content = <div className="text-center py-10 text-red-400">{error}</div>
  } else if (!data) {
    content = <div className="text-center py-10 text-gray-400">Aucune donnée.</div>
  } else {
    const {
      viewersNow = 0,
      burnRate = 0,
      revenues = 0,
      conversion = 0,
      unlocks = 0,
      openReports = 0,
    } = data
    content = (
      <>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <Link
            to="/admin/live"
            className="rounded-2xl shadow-lg p-5 bg-surface transition-all hover:scale-[1.01] block"
          >
            <div className="text-3xl">👀</div>
            <div className="mt-2 text-sm text-gray-400">Viewers en live (now)</div>
            <div className="text-2xl font-bold">{viewersNow}</div>
          </Link>
          <div className="rounded-2xl shadow-lg p-5 bg-surface">
            <div className="text-3xl">⏱</div>
            <div className="mt-2 text-sm text-gray-400">Burn rate crédits/min</div>
            <div className="text-2xl font-bold">{burnRate}</div>
          </div>
          <Link
            to="/admin/payments?tab=transactions"
            className="rounded-2xl shadow-lg p-5 bg-surface transition-all hover:scale-[1.01] block"
          >
            <div className="text-3xl">💰</div>
            <div className="mt-2 text-sm text-gray-400">Revenus {range}</div>
            <div className="text-2xl font-bold">
              {typeof revenues === 'number'
                ? revenues.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  })
                : '0€'}
            </div>
          </Link>
          <div className="rounded-2xl shadow-lg p-5 bg-surface">
            <div className="text-3xl">🛒</div>
            <div className="mt-2 text-sm text-gray-400">Conversion visites → achat</div>
            <div className="text-2xl font-bold">{conversion}%</div>
          </div>
          <Link
            to="/admin/photos"
            className="rounded-2xl shadow-lg p-5 bg-surface transition-all hover:scale-[1.01] block"
          >
            <div className="text-3xl">🔓</div>
            <div className="mt-2 text-sm text-gray-400">Déblocages {range}</div>
            <div className="text-2xl font-bold">{unlocks}</div>
          </Link>
          <Link
            to="/admin/moderation?status=open"
            className="rounded-2xl shadow-lg p-5 bg-surface transition-all hover:scale-[1.01] block"
          >
            <div className="text-3xl">⚠️</div>
            <div className="mt-2 text-sm text-gray-400">Signalements ouverts</div>
            <div className="text-2xl font-bold">{openReports}</div>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="rounded-2xl shadow-lg p-5 bg-surface h-64 flex items-center justify-center text-sm text-gray-400">
            Graphique crédits dépensés (placeholder)
          </div>
          <div className="rounded-2xl shadow-lg p-5 bg-surface h-64 flex items-center justify-center text-sm text-gray-400">
            ARPM du live (placeholder)
          </div>
        </div>
        <div className="rounded-2xl shadow-lg p-5 bg-surface h-64 mt-6 flex items-center justify-center text-sm text-gray-400">
          Top contenus (placeholder)
        </div>
      </>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          {ranges.map(r => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-3 py-1 rounded-xl text-sm transition-all hover:scale-[1.01] ${
                range === r.value
                  ? 'bg-primary text-white'
                  : 'bg-surface text-gray-400'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <button
          onClick={exportCsv}
          className="px-3 py-1 rounded-xl bg-surface text-sm text-gray-400 transition-all hover:scale-[1.01]"
        >
          Exporter CSV
        </button>
      </div>
      {content}
    </div>
  )
}

