import { useEffect, useState } from 'react'

export default function AdminModeration() {
  const [reports, setReports] = useState([])
  const [status, setStatus] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/moderation')
        if (!res.ok) throw new Error('network')
        const data = await res.json()
        setReports(data.reports)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = reports.filter(r => status === 'all' || r.status === status)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Modération & Signalements</h1>

      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="px-2 py-1 rounded-lg bg-surface border border-gray-700"
      >
        <option value="all">Tous</option>
        <option value="open">Ouverts</option>
        <option value="in_progress">En cours</option>
        <option value="resolved">Résolus</option>
      </select>

      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-500">Erreur de chargement</div>}
      {!loading && !error && filtered.length === 0 && <div>Aucun signalement</div>}

      {!loading && !error && filtered.length > 0 && (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th>Type</th>
              <th>Auteur</th>
              <th>Cible</th>
              <th>Résumé</th>
              <th>Statut</th>
              <th>Priorité</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-t border-gray-700">
                <td>{r.type}</td>
                <td>{r.author}</td>
                <td>{r.target}</td>
                <td>{r.summary}</td>
                <td>{r.status}</td>
                <td>{r.priority}</td>
                <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <button
                    className="text-primary"
                    onClick={() => alert('Voir contenu')}
                  >
                    Voir
                  </button>
                  <button
                    className="text-primary"
                    onClick={() => alert('Avertir')}
                  >
                    Avertir
                  </button>
                  <button
                    className="text-accent"
                    onClick={() => alert('Résoudre')}
                  >
                    Résoudre
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
