import { useEffect, useState } from 'react'

export default function AdminVideos() {
  const [videos, setVideos] = useState([])
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/videos')
        if (!res.ok) throw new Error('network')
        const data = await res.json()
        setVideos(data.videos)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = videos.filter(v => {
    return (
      (status === 'all' || v.status === status) &&
      v.title.toLowerCase().includes(query.toLowerCase())
    )
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Vidéos payantes</h1>
        <button
          className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90"
          onClick={() => alert('Ajouter')}
        >
          Ajouter
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Recherche..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="px-2 py-1 rounded-lg bg-surface border border-gray-700"
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="px-2 py-1 rounded-lg bg-surface border border-gray-700"
        >
          <option value="all">Tous</option>
          <option value="published">Publiées</option>
          <option value="draft">Brouillons</option>
        </select>
      </div>

      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-500">Erreur de chargement</div>}
      {!loading && !error && filtered.length === 0 && <div>Aucune vidéo</div>}

      {!loading && !error && filtered.length > 0 && (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th>Miniature</th>
              <th>Titre</th>
              <th>Durée</th>
              <th>Prix</th>
              <th>Achats</th>
              <th>Revenus</th>
              <th>Statut</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(video => (
              <tr key={video.id} className="border-t border-gray-700">
                <td>
                  <img
                    src={video.thumbnailUrl}
                    alt=""
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td>{video.title}</td>
                <td>{Math.round(video.duration / 60)}m</td>
                <td>{video.priceCredits}</td>
                <td>{video.purchases}</td>
                <td>{video.revenue}</td>
                <td>{video.status === 'published' ? 'Publiée' : 'Brouillon'}</td>
                <td>{new Date(video.createdAt).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <button
                    className="text-primary"
                    onClick={() => alert('Modifier')}
                  >
                    Modifier
                  </button>
                  <button
                    className="text-primary"
                    onClick={() => alert('Activer preview 5s')}
                  >
                    Preview 5s
                  </button>
                  <button
                    className="text-accent"
                    onClick={() => {
                      if (window.confirm('Supprimer cette vidéo ?')) {
                        alert('Supprimé')
                      }
                    }}
                  >
                    Supprimer
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
