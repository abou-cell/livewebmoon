export default function Login() {
  return (
    <div className="min-h-screen grid place-items-center p-6 bg-background text-gray-100">
      <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-surface shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Se connecter / S’inscrire</h2>
        <p className="text-sm text-gray-400">
          (Formulaire Firebase à intégrer plus tard)
        </p>
        <form className="space-y-3">
          <input className="w-full border border-gray-700 bg-surface rounded-xl p-3" type="email" placeholder="Email" />
          <input className="w-full border border-gray-700 bg-surface rounded-xl p-3" type="password" placeholder="Mot de passe" />
          <button type="button" className="w-full bg-primary text-white rounded-xl p-3">
            Continuer
          </button>
        </form>
      </div>
    </div>
  )
}
