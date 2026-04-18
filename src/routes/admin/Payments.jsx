import { useEffect, useState } from 'react'

export default function AdminPayments() {
  const [transactions, setTransactions] = useState([])
  const [payouts, setPayouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/payments')
        if (!res.ok) throw new Error('network')
        const data = await res.json()
        setTransactions(data.transactions)
        setPayouts(data.payouts)
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
      <h1 className="text-2xl font-semibold">Paiements & Payouts</h1>

      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-500">Erreur de chargement</div>}

      {!loading && !error && (
        <>
          <section className="space-y-2">
            <h2 className="text-xl font-medium">Transactions</h2>
            {transactions.length === 0 ? (
              <div>Aucune transaction</div>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th>ID</th>
                    <th>Client</th>
                    <th>Pack</th>
                    <th>Montant (€)</th>
                    <th>Frais</th>
                    <th>Statut</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(t => (
                    <tr key={t.id} className="border-t border-gray-700">
                      <td>{t.id}</td>
                      <td>{t.customer}</td>
                      <td>{t.pack}</td>
                      <td>{t.amountEuro}</td>
                      <td>{t.feesEuro}</td>
                      <td>{t.status}</td>
                      <td>{new Date(t.date).toLocaleDateString()}</td>
                      <td className="space-x-2">
                        <a
                          href={t.receiptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          Reçu
                        </a>
                        <button
                          className="text-primary"
                          onClick={() => {
                            if (window.confirm('Rembourser cette transaction ?')) {
                              alert('Remboursé')
                            }
                          }}
                        >
                          Rembourser
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-medium">Payouts</h2>
            {payouts.length === 0 ? (
              <div>Aucun payout</div>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th>Période</th>
                    <th>Brut (€)</th>
                    <th>Frais</th>
                    <th>Net</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map(p => (
                    <tr key={p.id} className="border-t border-gray-700">
                      <td>{p.period}</td>
                      <td>{p.grossEuro}</td>
                      <td>{p.feesEuro}</td>
                      <td>{p.netEuro}</td>
                      <td>{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </div>
  )
}
