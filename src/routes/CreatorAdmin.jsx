import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const sections = [
  { key: 'dashboard', icon: '⌂', label: 'Tableau de bord' },
  { key: 'live', icon: '◉', label: 'Diffusion en direct' },
  { key: 'videos', icon: '▣', label: 'Vidéos' },
  { key: 'playlists', icon: '☷', label: 'Playlists & programmation' },
  { key: 'stats', icon: '▥', label: 'Statistiques' },
  { key: 'settings', icon: '⚙', label: 'Paramètres' },
  { key: 'users', icon: '♙', label: 'Spectateurs' },
  { key: 'subscriptions', icon: '♕', label: 'Abonnements & revenus' },
]
const modes = [
  { title: 'Gratuit', detail: 'Disponible sans achat' },
  { title: 'Crédits', detail: 'Accès ponctuel, contrôlé par le serveur' },
  { title: 'Abonnement', detail: 'Accès selon les droits du compte' }
]
function Stat({ icon, title, value, description }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center gap-4"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-violet-100 text-3xl text-violet-600">{icon}</span><div><p className="text-sm text-slate-500">{title}</p><p className="mt-1 text-2xl font-bold text-slate-950">{value}</p><p className="mt-1 text-xs text-slate-500">{description}</p></div></div>
  </div>
}
export default function CreatorAdmin() {
  const { user, logout } = useAuth()
  const [section, setSection] = useState('dashboard')
  const [method, setMethod] = useState('webcam')
  const [cameraState, setCameraState] = useState('idle')
  const [cameraError, setCameraError] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const videoRef = useRef(null)
  const mediaRef = useRef(null)

  useEffect(() => () => { mediaRef.current?.getTracks().forEach(track => track.stop()) }, [])

  async function testCamera() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Ce navigateur ne permet pas l’aperçu caméra.')
      return
    }
    setCameraError('')
    setCameraState('loading')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      mediaRef.current?.getTracks().forEach(track => track.stop())
      mediaRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
      setCameraState('preview')
    } catch {
      setCameraState('idle')
      setCameraError('Accès caméra refusé ou indisponible. Vérifiez les permissions du navigateur.')
    }
  }
  function stopCamera() {
    mediaRef.current?.getTracks().forEach(track => track.stop())
    mediaRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
    setCameraState('idle')
  }
  function selectMethod(next) {
    stopCamera()
    setMethod(next)
  }
  const dashboard = section === 'dashboard'
  const live = dashboard || section === 'live'
  const videos = dashboard || section === 'videos'
  return <div className="min-h-screen bg-[#f8f9fc] font-sans text-slate-900 lg:flex">
    <aside className={`w-full border-r border-slate-200 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 ${menuOpen ? '' : 'max-lg:pb-0'}`}>
      <div className="flex items-center justify-between border-b border-slate-100 p-5"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-600 text-2xl text-white">▣</span><div><p className="text-lg font-bold">Live Studio</p><p className="text-xs text-slate-500">Administration</p></div></div><button className="rounded-lg border p-2 lg:hidden" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>☰</button></div>
      <nav className={`space-y-1 p-4 ${menuOpen ? '' : 'hidden lg:block'}`} aria-label="Navigation administration de chaîne">
        {sections.map(item => <button key={item.key} onClick={() => { setSection(item.key); setMenuOpen(false) }} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium ${section === item.key ? 'bg-violet-100 text-violet-700' : 'text-slate-600 hover:bg-slate-100'}`}><span className="w-6 text-xl">{item.icon}</span>{item.label}</button>)}
      </nav>
      <div className={`space-y-3 p-4 lg:absolute lg:bottom-0 lg:w-64 ${menuOpen ? '' : 'hidden lg:block'}`}><div className="rounded-xl border border-slate-200 p-3 text-sm"><p className="font-semibold">Administrateur de chaîne</p><p className="truncate text-xs text-slate-500">{user?.email}</p></div><button onClick={() => logout()} className="w-full rounded-xl border border-slate-200 p-3 text-left text-sm text-slate-600 hover:bg-slate-100">↪ Se déconnecter</button></div>
    </aside>
    <div className="min-w-0 flex-1">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-6 lg:px-8"><div><h1 className="text-2xl font-bold">{dashboard ? 'Tableau de bord' : sections.find(s => s.key === section)?.label}</h1><p className="mt-1 text-sm text-slate-500">Bienvenue dans votre espace d’administration de la Web TV</p></div><div className="flex gap-2"><Link to="/" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium">↗ Voir le site public</Link><button onClick={() => setSection('live')} className="rounded-xl bg-violet-700 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-600">＋ Nouvelle diffusion</button></div></header>
      <main className="space-y-5 p-5 lg:p-8">
        {dashboard && <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat icon="◉" title="Statut du live" value="Hors ligne" description="Aucune diffusion confirmée" /><Stat icon="▣" title="Vidéos stockées" value="—" description="API non connectée" /><Stat icon="♙" title="Vues totales" value="—" description="Statistiques à connecter" /><Stat icon="◷" title="Minutes stockées" value="—" description="Quota Cloudflare à connecter" /></div>}
        {live && <div className="grid gap-5 xl:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="mb-6 border-l-2 border-violet-600 pl-3 text-lg font-bold">Diffusion en direct</h2><div className="grid gap-5 md:grid-cols-2"><div><p className="mb-3 text-xs font-semibold">Aperçu du live</p><div className="relative grid aspect-video place-items-center overflow-hidden rounded-lg bg-black text-center text-white"><video ref={videoRef} autoPlay muted playsInline className={`absolute inset-0 h-full w-full object-contain ${cameraState === 'preview' ? '' : 'hidden'}`} />{cameraState !== 'preview' && <div><span className="text-4xl">▣</span><p className="mt-3 text-sm font-semibold">Aucun live en cours</p><p className="mt-2 px-4 text-xs text-slate-300">Votre aperçu caméra local apparaîtra ici.</p></div>}<span className="absolute right-3 top-3 rounded bg-red-700 px-2 py-1 text-xs">● HORS LIGNE</span></div></div><div><p className="mb-3 text-xs font-semibold">Choisir une méthode</p><div className="mb-4 flex gap-2"><button onClick={() => selectMethod('webcam')} className={`flex-1 rounded-lg border p-3 text-xs ${method === 'webcam' ? 'border-violet-600 bg-violet-50 text-violet-700' : 'border-slate-200'}`}>▣ Webcam (PC)</button><button onClick={() => selectMethod('obs')} className={`flex-1 rounded-lg border p-3 text-xs ${method === 'obs' ? 'border-violet-600 bg-violet-50 text-violet-700' : 'border-slate-200'}`}>◉ OBS Studio</button></div><div className="rounded-lg border bg-slate-50 p-4 text-sm"><p className="font-semibold">{method === 'webcam' ? 'Tester votre webcam intégrée' : 'Diffuser avec OBS Studio'}</p><p className="mt-1 text-xs leading-relaxed text-slate-500">{method === 'webcam' ? 'Prévisualisation locale uniquement : elle ne transmet aucune vidéo au serveur.' : 'Vous aurez besoin de l’URL RTMPS et de la clé de diffusion obtenues depuis le backend sécurisé.'}</p></div>{method === 'webcam' && <div className="mt-4 flex gap-2"><button onClick={testCamera} disabled={cameraState === 'loading'} className="flex-1 rounded-lg bg-violet-700 px-3 py-3 text-xs font-semibold text-white">▣ {cameraState === 'preview' ? 'Relancer le test' : 'Tester la webcam'}</button>{cameraState === 'preview' && <button onClick={stopCamera} className="rounded-lg border px-3 text-xs">Arrêter</button>}</div>}{cameraError && <p role="alert" className="mt-2 text-xs text-red-600">{cameraError}</p>}</div></div><div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-blue-700">ℹ La diffusion réelle nécessite l’activation du service Cloudflare Stream et des API sécurisées.</div></section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="mb-6 border-l-2 border-violet-600 pl-3 text-lg font-bold">Informations de diffusion</h2><div className="mb-6 flex gap-6 border-b pb-3 text-sm"><button className={method === 'webcam' ? 'font-bold text-violet-700' : 'text-slate-500'} onClick={() => selectMethod('webcam')}>Webcam (PC)</button><button className={method === 'obs' ? 'font-bold text-violet-700' : 'text-slate-500'} onClick={() => selectMethod('obs')}>OBS Studio</button></div><div className="grid gap-5 md:grid-cols-2"><div><p className="mb-4 text-sm font-semibold">Étapes à suivre</p>{(method === 'webcam' ? ['Autoriser l’accès à la caméra', 'Vérifier l’image et le son', 'Connecter le service de diffusion'] : ['Installer et ouvrir OBS Studio', 'Configurer RTMPS et la clé privée', 'Lancer le flux depuis OBS']).map((step,i) => <div key={step} className="mb-5 flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet-700 text-xs font-bold text-white">{i+1}</span><p className="text-xs font-semibold">{step}</p></div>)}</div><div className="space-y-4 rounded-xl border border-slate-200 p-4 text-xs"><div><p className="font-semibold">Lien du live</p><Link to="/watch/live" className="mt-2 block break-all rounded-lg border bg-slate-50 p-3 text-blue-700">Ouvrir /watch/live</Link></div><p className="text-slate-500">Le lecteur refuse l’accès si aucun jeton de lecture autorisé n’est fourni.</p><div className="rounded-lg bg-amber-50 p-3 text-amber-800">Les clés RTMP ne sont jamais affichées tant qu’un service serveur autorisé ne les délivre pas.</div></div></div></section>
        </div>}
        {videos && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-4"><h2 className="border-l-2 border-violet-600 pl-3 text-lg font-bold">Bibliothèque de vidéos</h2><button disabled title="Service d'upload à connecter" className="rounded-lg bg-violet-600 px-4 py-2 text-sm text-white opacity-50">＋ Ajouter une vidéo</button></div><div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-500">Aucune donnée de bibliothèque chargée. La gestion des vidéos Cloudflare sera connectée au backend.</div></section>}
        {!dashboard && !live && !videos && <section className="rounded-2xl border border-slate-200 bg-white p-8"><h2 className="text-lg font-bold">{sections.find(s => s.key === section)?.label}</h2><p className="mt-3 text-sm text-slate-500">Module réservé à la prochaine intégration serveur. Aucune donnée ou transaction fictive n'est présentée.</p>{section === 'subscriptions' && <div className="mt-6 grid gap-3 md:grid-cols-3">{modes.map(m => <div key={m.title} className="rounded-xl border p-4"><h3 className="font-semibold">{m.title}</h3><p className="mt-2 text-sm text-slate-500">{m.detail}</p></div>)}</div>}</section>}
      </main>
    </div>
  </div>
}
