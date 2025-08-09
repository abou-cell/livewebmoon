export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="rounded-2xl shadow-lg p-5 bg-surface">
          <div className="text-3xl">👀</div>
          <div className="mt-2 text-sm text-gray-400">Viewers en live (now)</div>
          <div className="text-2xl font-bold">0</div>
        </div>
        <div className="rounded-2xl shadow-lg p-5 bg-surface">
          <div className="text-3xl">⏱</div>
          <div className="mt-2 text-sm text-gray-400">Burn rate crédits/min</div>
          <div className="text-2xl font-bold">0</div>
        </div>
        <div className="rounded-2xl shadow-lg p-5 bg-surface">
          <div className="text-3xl">💰</div>
          <div className="mt-2 text-sm text-gray-400">Revenus 24h</div>
          <div className="text-2xl font-bold">0€</div>
        </div>
        <div className="rounded-2xl shadow-lg p-5 bg-surface">
          <div className="text-3xl">🛒</div>
          <div className="mt-2 text-sm text-gray-400">Conversion visites → achat</div>
          <div className="text-2xl font-bold">0%</div>
        </div>
        <div className="rounded-2xl shadow-lg p-5 bg-surface">
          <div className="text-3xl">🔓</div>
          <div className="mt-2 text-sm text-gray-400">Déblocages 24h</div>
          <div className="text-2xl font-bold">0</div>
        </div>
        <div className="rounded-2xl shadow-lg p-5 bg-surface">
          <div className="text-3xl">⚠️</div>
          <div className="mt-2 text-sm text-gray-400">Signalements ouverts</div>
          <div className="text-2xl font-bold">0</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl shadow-lg p-5 bg-surface h-64">Graphique crédits dépensés (placeholder)</div>
        <div className="rounded-2xl shadow-lg p-5 bg-surface h-64">ARPM du live (placeholder)</div>
      </div>
      <div className="rounded-2xl shadow-lg p-5 bg-surface h-64">Top contenus (placeholder)</div>
    </div>
  )
}
