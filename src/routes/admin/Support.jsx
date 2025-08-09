import { useEffect, useState } from 'react'

export default function AdminSupport() {
  const [tickets, setTickets] = useState([])
  const [status, setStatus] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/support')
        if (!res.ok) throw new Error('network')
        const data = await res.json()
        setTickets(data.tickets)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = tickets.filter(t => status === 'all' || t.status === status)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Support</h1>

      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="px-2 py-1 rounded-lg bg-surface border border-gray-700"
      >
        <option value="all">Tous</option>
        <option value="open">Ouverts</option>
        <option value="closed">Fermés</option>
      </select>

      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-500">Erreur de chargement</div>}
      {!loading && !error && filtered.length === 0 && <div>Aucun ticket</div>}

      {!loading && !error && filtered.length > 0 && (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th>Statut</th>
              <th>Priorité</th>
              <th>Client</th>
              <th>Dernier message</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className="border-t border-gray-700">
                <td>{t.status}</td>
                <td>{t.priority}</td>
                <td>{t.customer}</td>
                <td>{t.lastMessage}</td>
                <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <button
                    className="text-primary"
                    onClick={() => alert('Répondre')}
                  >
                    Répondre
                  </button>
                  <button
                    className="text-accent"
                    onClick={() => alert('Fermer')}
                  >
                    Fermer
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
