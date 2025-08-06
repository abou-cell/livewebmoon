export default function StreamerPanel() {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Espace créateur (démo)</h1>

      <button className="px-4 py-2 rounded-xl bg-[#635BFF] text-white shadow">
        Lancer mon live
      </button>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border shadow-lg p-6">
          <h2 className="font-semibold mb-2">RTMP</h2>
          <div className="text-sm text-gray-600">URL : rtmp://example.cloudflare.com/live</div>
          <div className="text-sm text-gray-600">Stream Key : ****************</div>
        </div>
        <div className="rounded-2xl border shadow-lg p-6">
          <h2 className="font-semibold mb-2">Statistiques</h2>
          <div className="text-sm">Spectateurs en ligne : 0</div>
          <div className="text-sm">Crédits générés : 0</div>
        </div>
      </div>
    </div>
  )
}
