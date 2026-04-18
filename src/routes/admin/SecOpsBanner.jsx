import { useState } from 'react'

const LANG = navigator.language?.startsWith('fr') ? 'fr' : 'en'

const t = key => {
  const dict = {
    secOps: { fr: 'SecOps', en: 'SecOps' },
    regenerateKey: { fr: 'Régénérer Stream Key', en: 'Regenerate Stream Key' },
    purgeTokens: { fr: 'Purger tokens', en: 'Purge tokens' },
    maintenance: { fr: 'Mettre en maintenance', en: 'Enable maintenance mode' },
    freezePayouts: { fr: 'Geler payouts', en: 'Freeze payouts' },
    exportBackup: { fr: 'Exporter full backup', en: 'Export full backup' },
    confirm: { fr: 'Confirmer ?', en: 'Confirm?' },
    confirmAgain: {
      fr: action => `Confirmer définitivement l\u2019action : ${action} ?`,
      en: action => `Permanently confirm action: ${action}?`
    }
  }
  return dict[key]
}

const actions = [
  { key: 'regenerateKey', emoji: '🔐' },
  { key: 'purgeTokens', emoji: '🧹' },
  { key: 'maintenance', emoji: '🚧' },
  { key: 'freezePayouts', emoji: '❄️' },
  { key: 'exportBackup', emoji: '📦' }
]

export default function SecOpsBanner() {
  const [busy, setBusy] = useState(false)

  const handleAction = async key => {
    const label = t(key)[LANG]
    if (window.confirm(t('confirm')[LANG]) && window.confirm(t('confirmAgain')[LANG](label))) {
      setBusy(true)
      try {
        await fetch('/api/admin/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: key })
        })
      } catch (err) {
        console.error(err)
      } finally {
        setBusy(false)
      }
    }
  }

  return (
    <div
      className="bg-indigo-50 text-indigo-800 px-4 py-2 flex gap-4 justify-center text-sm"
      role="region"
      aria-label={t('secOps')[LANG]}
    >
      {actions.map(a => (
        <button
          key={a.key}
          onClick={() => handleAction(a.key)}
          disabled={busy}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-100 focus:outline-none focus-visible:ring"
        >
          <span aria-hidden>{a.emoji}</span>
          <span>{t(a.key)[LANG]}</span>
        </button>
      ))}
    </div>
  )
}
