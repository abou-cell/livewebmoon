import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Subscriber() {
  const [credits, setCredits] = useState(12)
  const [unlockedPhotos, setUnlockedPhotos] = useState({})
  const [unlockedVideos, setUnlockedVideos] = useState({})
  const photos = Array.from({ length: 3 }).map((_, i) => ({ id: i + 1 }))
  const videos = Array.from({ length: 2 }).map((_, i) => ({ id: i + 1, duration: '2:30' }))

  function unlock(type, id, cost) {
    if (credits < cost) return alert('Crédits insuffisants')
    setCredits(c => c - cost)
    if (type === 'photo') setUnlockedPhotos(p => ({ ...p, [id]: true }))
    if (type === 'video') setUnlockedVideos(v => ({ ...v, [id]: true }))
  }

  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm h-14 px-4 flex justify-between items-center">
        <Link to="/" className="font-bold">🌙 StreamMint</Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="hidden sm:block">🔗 Accueil</Link>
          <button className="hidden sm:block">👤 Mon compte</button>
          <button className="hidden sm:block">💳 Recharger</button>
          <button className="hidden sm:block">📤 Déconnexion</button>
          <button className="sm:hidden">☰</button>
          <button className="px-3 py-1 bg-gray-100 rounded-full" title="Recharger">
            💳 {credits} crédits
          </button>
        </div>
      </header>

      {/* Banner */}
      <section className="bg-white shadow-sm p-6 flex flex-col items-center text-center gap-4">
        <img
          src="https://via.placeholder.com/120"
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex items-center gap-2">
          <span className="font-semibold">@marie-modele</span>
          <span className="text-blue-500">✅</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <span>📷 12 photos</span>
          <span>🎞 6 vidéos</span>
          <span>📡 Live en cours</span>
          <span>⭐ 4.8/5</span>
        </div>
        <button className="px-4 py-2 bg-[#635BFF] text-white rounded-xl shadow hover:scale-105 transition">
          S’abonner à ce créateur
        </button>
        <p className="text-xs text-gray-500">
          Paiement sécurisé • Tokens vidéo • Support 24/7
        </p>
      </section>

      {/* Credits info */}
      <section className="p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl mx-auto text-center space-y-2">
          <p className="text-lg">Vous avez : 💳 {credits} crédits</p>
          <p>👉 1 minute de live = 1 crédit</p>
          <p>👉 Une photo/vidéo = 3 à 5 crédits</p>
          <button className="px-4 py-2 bg-[#635BFF] text-white rounded-xl">💳 Recharger mes crédits</button>
        </div>
      </section>

      {/* Live section placeholder */}
      <section className="p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">📡 Live streaming</h2>
          <div className="aspect-video bg-gray-200 flex items-center justify-center mb-4">
            Player live
          </div>
          <p className="text-sm text-gray-500">Minuteur & débit automatique toutes les 60s</p>
        </div>
      </section>

      {/* Photos section */}
      <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">📸 Photos exclusives</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {photos.map(photo => (
            <div key={photo.id} className="relative border rounded-lg overflow-hidden shadow">
              <img
                src="https://via.placeholder.com/400x250"
                className={`w-full h-full object-cover ${unlockedPhotos[photo.id] ? '' : 'blur-sm'}`}
              />
              {!unlockedPhotos[photo.id] && (
                <button
                  onClick={() => unlock('photo', photo.id, 3)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 text-white"
                >
                  🔓 Déverrouiller – 3 crédits
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Videos section */}
      <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">🎞 Vidéos payantes</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {videos.map(video => (
            <div key={video.id} className="relative border rounded-lg overflow-hidden shadow">
              <div className="aspect-video w-full bg-gray-200 flex items-center justify-center">
                {unlockedVideos[video.id] ? (
                  <span>Lecture vidéo</span>
                ) : (
                  <span className="text-gray-500">Vidéos payantes</span>
                )}
              </div>
              {!unlockedVideos[video.id] && (
                <button
                  onClick={() => unlock('video', video.id, 5)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 text-white"
                >
                  🔓 Déverrouiller – 5 crédits
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Premium subscription */}
      <section className="p-6">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 text-center space-y-4">
          <h2 className="text-xl font-semibold">🎁 Abonnement Premium</h2>
          <p className="text-gray-600">Accès illimité au créateur</p>
          <p className="text-gray-600">Lives sans perte de crédits</p>
          <p className="text-gray-600">Remises sur photos/vidéos</p>
          <button className="px-4 py-2 bg-[#635BFF] text-white rounded-xl">
            🔒 Abonnement Premium – 9,99 €/mois
          </button>
        </div>
      </section>

      {/* History */}
      <section className="p-6 flex-1">
        <h2 className="text-xl font-semibold mb-4">🧾 Historique d’interactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">📅 Date</th>
                <th className="p-2 text-left">🎬 Contenu</th>
                <th className="p-2 text-left">🎫 Crédits</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-2">06/08</td>
                <td className="p-2">Live Marie</td>
                <td className="p-2">−3</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">06/08</td>
                <td className="p-2">Photo 5</td>
                <td className="p-2">−3</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">05/08</td>
                <td className="p-2">Vidéo 2</td>
                <td className="p-2">−5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-auto">
        <div className="max-w-4xl mx-auto text-center space-y-2 text-sm">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#">Mentions légales</a>
            <a href="#">CGU</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">Support</a>
          </div>
          <p>© 2024 StreamMint</p>
        </div>
      </footer>
    </div>
  )
}

