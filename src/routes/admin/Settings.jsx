import { useEffect, useState } from 'react'

export default function AdminSettings() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/settings')
        if (!res.ok) throw new Error('network')
        const data = await res.json()
        setSettings(data.settings)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  function save() {
    alert('Sauvegarder')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Paramètres</h1>

      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-500">Erreur de chargement</div>}
      {!loading && !error && settings && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.maintenance}
                onChange={e =>
                  setSettings({ ...settings, maintenance: e.target.checked })
                }
              />
              Maintenance
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <label>Nom public</label>
            <input
              type="text"
              value={settings.publicName}
              onChange={e =>
                setSettings({ ...settings, publicName: e.target.value })
              }
              className="px-2 py-1 rounded-lg bg-surface border border-gray-700"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Email support</label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={e =>
                setSettings({ ...settings, supportEmail: e.target.value })
              }
              className="px-2 py-1 rounded-lg bg-surface border border-gray-700"
            />
          </div>
          <button
            onClick={save}
            className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90"
          >
            Sauvegarder
          </button>
        </div>
      )}
    </div>
  )
}
