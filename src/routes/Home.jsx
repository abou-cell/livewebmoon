import { Link } from 'react-router-dom'
import { useState } from 'react'

function PaidItem({ type }) {
  const [unlocked, setUnlocked] = useState(false)
  return (
    <div className="relative border rounded-lg overflow-hidden shadow">
      <div className={unlocked ? '' : 'blur-sm'}>
        {type === 'photo' ? (
          <img
            src="https://via.placeholder.com/400x250"
            alt="Contenu payant"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="aspect-video w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Vidéo payante</span>
          </div>
        )}
      </div>
      {!unlocked && (
        <button
          onClick={() => setUnlocked(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/50 text-white"
        >
          Déverrouiller
        </button>
      )}
    </div>
  )
}

function ArticleCard({ title }) {
  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-lg transition">
      <h3 className="font-semibold mb-2">{title}</h3>
      <button className="text-indigo-600">Lire plus</button>
    </div>
  )
}

export default function Home() {
  return (
    <div className="font-sans">
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="font-bold text-lg">LiveStream+</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#home">Accueil</a>
          <a href="#features">Fonctionnalités</a>
          <a href="#pricing">Tarifs</a>
          <Link to="/login">Connexion / Inscription</Link>
        </nav>
        <button className="md:hidden">☰</button>
      </header>

      <section
        id="home"
        className="text-center py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
      >
        <h1 className="text-4xl font-bold mb-4">
          Monétise ton contenu. Regarde en direct. Paye à la minute.
        </h1>
        <div className="flex justify-center gap-4">
          <Link
            to="/streamer"
            className="px-6 py-3 bg-white text-indigo-600 rounded-lg hover:scale-105 transition"
          >
            🚀 Lancer mon live
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-transparent border border-white rounded-lg hover:bg-white hover:text-indigo-600 transition"
          >
            🎥 Rejoindre un live
          </Link>
          <Link
            to="/super-admin"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-white hover:text-indigo-600 transition"
          >
            ⚙️ Interface admin
          </Link>
        </div>
      </section>

      <section id="about" className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">À propos</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          LiveStream+ est une plateforme innovante de streaming en direct avec un
          système de crédits à la minute. Les streamers gagnent. Les viewers
          choisissent ce qu’ils veulent regarder. Simple. Sécurisé. Instantané.
        </p>
        <div className="flex justify-center gap-8 mt-6">
          <div>
            <h3 className="font-semibold">Mission</h3>
            <p>Démocratiser le live monétisé</p>
          </div>
          <div>
            <h3 className="font-semibold">Vision</h3>
            <p>Rendre chaque minute de contenu vidéo rémunérable</p>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 bg-gray-50 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Fonctionnalités</h2>
        <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-2">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">💸 Système de crédits</h3>
            <p>Rechargement via Stripe, 1 crédit = 1 minute</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">📺 Streaming sécurisé</h3>
            <p>Cloudflare Stream Live + Token Auth</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">🧑‍🎤 Dashboard Streamer</h3>
            <p>Lancer le live, suivre crédits et viewers</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">👤 Dashboard Viewer</h3>
            <p>Rejoindre un live, minuterie + crédit en direct</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Packs de crédits</h2>
        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-3">
          <div className="p-6 border rounded-xl text-center shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">⚡ Pack Starter</h3>
            <p className="mb-4">5 crédits – 5 MAD</p>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
              Acheter
            </button>
          </div>
          <div className="p-6 border rounded-xl text-center shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">💎 Pack Pro</h3>
            <p className="mb-4">20 crédits – 18 MAD</p>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
              Acheter
            </button>
          </div>
          <div className="p-6 border rounded-xl text-center shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">🚀 Pack Unlimited</h3>
            <p className="mb-4">50 crédits – 40 MAD</p>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
              Acheter
            </button>
          </div>
        </div>
      </section>

      <section id="content" className="py-16 bg-gray-50 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contenus payants</h2>
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
          <PaidItem type="photo" />
          <PaidItem type="photo" />
          <PaidItem type="video" />
          <PaidItem type="video" />
        </div>
      </section>

      <section id="testimonials" className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Témoignages</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <blockquote className="border-l-4 pl-4">
            <p>« J’ai gagné 200 MAD dès mon premier live ! »</p>
            <cite className="text-sm text-gray-500">– Mouna, streamer</cite>
          </blockquote>
          <blockquote className="border-l-4 pl-4">
            <p>« Pas d’abonnement, je paye ce que je regarde. Parfait ! »</p>
            <cite className="text-sm text-gray-500">– Youssef, viewer</cite>
          </blockquote>
        </div>
      </section>

      <section id="blog" className="py-16 bg-gray-50 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Articles récents</h2>
        <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-3">
          <ArticleCard title="Comment gagner de l’argent avec vos vidéos ?" />
          <ArticleCard title="Les secrets d’un live réussi" />
          <ArticleCard title="Stripe, crédits et sécurité : notre système en détail" />
        </div>
      </section>

      <section id="cta" className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Prêt à streamer ou à regarder ?</h2>
        <div className="flex justify-center gap-4">
          <Link to="/login" className="px-6 py-3 bg-indigo-600 text-white rounded-lg">
            Commencer maintenant
          </Link>
          <Link to="/dashboard" className="px-6 py-3 border rounded-lg">
            Je suis spectateur
          </Link>
          <Link to="/streamer" className="px-6 py-3 border rounded-lg">
            Je suis streamer
          </Link>
        </div>
      </section>

      <section id="contact" className="py-16 bg-gray-50 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contact</h2>
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nom"
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
            />
            <textarea
              placeholder="Message"
              className="w-full border p-2 rounded h-32"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Envoyer
            </button>
          </form>
          <div className="space-y-2">
            <p>
              Email support :
              <a
                href="mailto:support@liveapp.com"
                className="text-indigo-600"
              >
                support@liveapp.com
              </a>
            </p>
            <p>WhatsApp : +212 6 xx xx xx xx</p>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 bg-black text-white">
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-bold mb-2">Liens rapides</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">CGU / Politique de confidentialité</a>
              </li>
              <li>
                <a href="#">Mentions légales</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Réseaux sociaux</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">TikTok</a>
              </li>
              <li>
                <a href="#">X</a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-bold mb-2">Newsletter</h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 p-2 rounded text-black"
              />
              <button className="px-4 py-2 bg-indigo-600 rounded">
                S’inscrire
              </button>
            </form>
          </div>
        </div>
        <p className="text-center text-sm mt-8">© 2024 LiveStream+</p>
      </footer>
    </div>
  )
}
