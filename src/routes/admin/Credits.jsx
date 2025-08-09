import { useEffect, useState } from 'react'

export default function AdminCredits() {
  const [packs, setPacks] = useState([])
  const [promos, setPromos] = useState([])
  const [liveDebit, setLiveDebit] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/credits')
        if (!res.ok) throw new Error('network')
        const data = await res.json()
        setPacks(data.packs)
        setPromos(data.promos)
        setLiveDebit(data.liveDebit)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Crédits & Prix</h1>

      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-500">Erreur de chargement</div>}

      {!loading && !error && (
        <>
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Packs</h2>
              <button
                className="px-3 py-1 rounded-lg bg-primary text-white hover:opacity-90"
                onClick={() => alert('Ajouter pack')}
              >
                Ajouter pack
              </button>
            </div>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th>Prix (€)</th>
                  <th>Crédits</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {packs.map(p => (
                  <tr key={p.id} className="border-t border-gray-700">
                    <td>{p.priceEuro}</td>
                    <td>{p.credits}</td>
                    <td className="space-x-2">
                      <button
                        className="text-primary"
                        onClick={() => alert('Modifier pack')}
                      >
                        Modifier
                      </button>
                      <button
                        className="text-accent"
                        onClick={() => {
                          if (window.confirm('Supprimer ce pack ?')) {
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
          </section>

          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Promos</h2>
              <button
                className="px-3 py-1 rounded-lg bg-primary text-white hover:opacity-90"
                onClick={() => alert('Ajouter promo')}
              >
                Ajouter promo
              </button>
            </div>
            {promos.length === 0 ? (
              <div>Aucune promotion</div>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th>Code</th>
                    <th>Réduction (%)</th>
                    <th>Expire le</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {promos.map(pr => (
                    <tr key={pr.code} className="border-t border-gray-700">
                      <td>{pr.code}</td>
                      <td>{pr.discountPercent}</td>
                      <td>{new Date(pr.expiresAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="text-accent"
                          onClick={() => {
                            if (window.confirm('Supprimer cette promo ?')) {
                              alert('Supprimée')
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
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-medium">Débit live</h2>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                value={liveDebit}
                onChange={e => setLiveDebit(Number(e.target.value))}
                className="px-2 py-1 rounded-lg bg-surface border border-gray-700 w-24"
              />
              <span>crédits / minute</span>
              <button
                className="px-3 py-1 rounded-lg bg-primary text-white hover:opacity-90"
                onClick={() => alert('Débit enregistré')}
              >
                Enregistrer
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
