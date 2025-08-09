import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Live() {
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showKey, setShowKey] = useState(false)

  const fetchInfo = () => {
    setLoading(true)
    setError(null)
    axios
      .get('/api/admin/live')
      .then(res => {
        setInfo(res.data)
      })
      .catch(() => setError('Erreur de chargement'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchInfo()
    const es = new EventSource('/api/admin/live/events')
    es.addEventListener('live_stream.started', fetchInfo)
    es.addEventListener('live_stream.ended', fetchInfo)
    return () => es.close()
  }, [])

  const start = async () => {
    await axios.post('/api/live/startTest')
    fetchInfo()
  }

  const stop = async () => {
    if (window.confirm("Confirmer l'arrêt du live ?")) {
      await axios.post('/api/live/stop')
      fetchInfo()
    }
  }

  const copy = text => navigator.clipboard.writeText(text)

  let content
  if (loading) {
    content = <div className="text-center py-10 text-gray-400">Chargement...</div>
  } else if (error) {
    content = <div className="text-center py-10 text-red-400">{error}</div>
  } else if (!info) {
    content = <div className="text-center py-10 text-gray-400">Aucune donnée.</div>
  } else {
    content = (
      <div className="space-y-6">
        <div className="space-x-4">
          {!info.isStreaming ? (
            <button
              onClick={start}
              className="px-4 py-2 rounded-xl bg-primary text-white transition-all hover:scale-[1.01]"
            >
              🎬 Démarrer un live test
            </button>
          ) : (
            <button
              onClick={stop}
              className="px-4 py-2 rounded-xl bg-red-600 text-white transition-all hover:scale-[1.01]"
            >
              🛑 Forcer l'arrêt
            </button>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-400">URL RTMP</div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={info.rtmpUrl || ''}
                className="flex-1 px-3 py-2 rounded-xl bg-surface"
              />
              <button
                onClick={() => copy(info.rtmpUrl)}
                className="px-3 py-2 rounded-xl bg-surface text-sm text-gray-400 transition-all hover:scale-[1.01]"
              >
                Copier
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Stream Key</div>
            <div className="flex items-center gap-2">
              <input
                type={showKey ? 'text' : 'password'}
                readOnly
                value={info.streamKey || ''}
                className="flex-1 px-3 py-2 rounded-xl bg-surface"
              />
              <button
                onClick={() => setShowKey(s => !s)}
                className="px-3 py-2 rounded-xl bg-surface text-sm text-gray-400 transition-all hover:scale-[1.01]"
              >
                {showKey ? 'Masquer' : 'Voir'}
              </button>
              <button
                onClick={() => copy(info.streamKey)}
                className="px-3 py-2 rounded-xl bg-surface text-sm text-gray-400 transition-all hover:scale-[1.01]"
              >
                Copier
              </button>
            </div>
          </div>
        </div>
        {info.playbackId && info.previewToken && (
          <div className="rounded-2xl shadow-lg bg-surface p-5">
            <iframe
              title="preview"
              className="w-full aspect-video rounded-xl"
              src={`https://iframe.videodelivery.net/${info.playbackId}?token=${info.previewToken}`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    )
  }

  return <div className="space-y-6">{content}</div>
}

