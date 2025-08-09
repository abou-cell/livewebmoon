import { useEffect, useState } from 'react'

export default function AdminPhotos() {
  const [photos, setPhotos] = useState([])
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/photos')
        if (!res.ok) throw new Error('network')
        const data = await res.json()
        setPhotos(data.photos)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = photos.filter(p => {
    return (
      (status === 'all' || p.status === status) &&
      p.title.toLowerCase().includes(query.toLowerCase())
    )
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Photos payantes</h1>
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
      {!loading && !error && filtered.length === 0 && <div>Aucune photo</div>}

      {!loading && !error && filtered.length > 0 && (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th>Miniature</th>
              <th>Titre</th>
              <th>Prix</th>
              <th>Vues</th>
              <th>Achats</th>
              <th>Revenus</th>
              <th>Statut</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(photo => (
              <tr key={photo.id} className="border-t border-gray-700">
                <td>
                  <img
                    src={photo.thumbnailUrl}
                    alt=""
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td>{photo.title}</td>
                <td>{photo.priceCredits}</td>
                <td>{photo.views}</td>
                <td>{photo.purchases}</td>
                <td>{photo.revenue}</td>
                <td>{photo.status === 'published' ? 'Publiée' : 'Brouillon'}</td>
                <td>{new Date(photo.createdAt).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <button
                    className="text-primary"
                    onClick={() => alert('Modifier')}
                  >
                    Modifier
                  </button>
                  <button
                    className="text-primary"
                    onClick={() => alert('Dupliquer')}
                  >
                    Dupliquer
                  </button>
                  <button
                    className="text-primary"
                    onClick={() => alert('Dépublier')}
                  >
                    {photo.status === 'published' ? 'Dépublier' : 'Publier'}
                  </button>
                  <button
                    className="text-accent"
                    onClick={() => {
                      if (window.confirm('Supprimer cette photo ?')) {
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
