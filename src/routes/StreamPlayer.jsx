import { useEffect, useState } from 'react'

export default function StreamPlayer() {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen p-6 space-y-6 bg-background text-gray-100">
      <h1 className="text-2xl font-semibold">Lecture du live (démo)</h1>
      <div className="rounded-2xl border border-gray-700 bg-surface shadow-lg aspect-video grid place-items-center">
        <span className="text-gray-400">Cloudflare Player (token) à intégrer ici</span>
      </div>
      <div className="rounded-xl border border-gray-700 bg-surface p-4">
        Minuteur : <strong>{seconds}s</strong> — (débit 1 crédit / 60s à implémenter côté Functions)
      </div>
    </div>
  )
}
