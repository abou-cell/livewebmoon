import { useEffect, useState } from 'react'

export default function AdminLogs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/logs')
        if (!res.ok) throw new Error('network')
        const data = await res.json()
        setLogs(data.logs)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Logs & Audit</h1>

      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-500">Erreur de chargement</div>}
      {!loading && !error && logs.length === 0 && <div>Aucun log</div>}

      {!loading && !error && logs.length > 0 && (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th>Acteur</th>
              <th>Action</th>
              <th>Ressource</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} className="border-t border-gray-700">
                <td>{log.actor}</td>
                <td>{log.action}</td>
                <td>{log.resource}</td>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
