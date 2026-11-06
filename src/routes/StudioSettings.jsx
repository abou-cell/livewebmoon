import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const themes = [
  { id:'rose', title:'Rose poudré', color:'#b25f8b' },
  { id:'lavender', title:'Lavande', color:'#8364a9' },
  { id:'pearl', title:'Perle', color:'#b58c7f' },
  { id:'noir', title:'Nuit élégante', color:'#332739' },
]
export default function StudioSettings() {
  const [form,setForm] = useState({display_name:'',introduction:'',theme:'rose'})
  const [busy,setBusy] = useState(false)
  const [message,setMessage] = useState('')
  useEffect(() => {
    supabase.from('creator_settings').select('display_name,introduction,theme').eq('id',true).maybeSingle()
      .then(({data,error})=>{if(data)setForm({display_name:data.display_name,introduction:data.introduction,theme:data.theme});if(error)setMessage(error.message)})
  }, [])
  async function save(e) {
    e.preventDefault();setBusy(true);setMessage('')
    const { data, error } = await supabase.from('creator_settings').update({display_name:form.display_name.trim(), introduction:form.introduction.trim(),theme:form.theme,updated_at:new Date().toISOString()}).eq('id',true).select('id').single()
    setMessage(error ? error.message : data ? 'Paramètres enregistrés. Actualisez le site public pour voir vos modifications.' : 'Mise à jour non autorisée.')
    setBusy(false)
  }
  return <section className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><p className="text-xs font-semibold uppercase tracking-widest text-violet-600">Votre identité de marque</p><h2 className="mt-3 text-2xl font-bold">Personnaliser mon studio</h2><p className="mt-2 text-sm text-slate-500">Ces informations sont visibles sur la page publique. Les visiteurs n'ont pas accès à leur modification.</p><form onSubmit={save} className="mt-8 space-y-6"><label className="block text-sm font-semibold">Nom du studio<input required maxLength={80} value={form.display_name} onChange={e=>setForm({...form,display_name:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 p-3" /></label><label className="block text-sm font-semibold">Texte de présentation<textarea maxLength={500} rows={5} value={form.introduction} onChange={e=>setForm({...form,introduction:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 p-3" /></label><fieldset><legend className="text-sm font-semibold">Thème de couleur</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">{themes.map(t=><label key={t.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${form.theme===t.id?'border-violet-600 bg-violet-50':'border-slate-200'}`}><input type="radio" name="theme" checked={form.theme===t.id} onChange={()=>setForm({...form,theme:t.id})}/><span className="h-8 w-8 rounded-full" style={{background:t.color}}/><span className="text-sm">{t.title}</span></label>)}</div></fieldset><p className="rounded-xl bg-slate-50 p-4 text-xs text-slate-600">Logo et bannière : l'envoi de fichiers sera disponible après la mise en place du stockage Supabase avec ses règles de sécurité. Aucun fichier privé ne doit être rendu public par défaut.</p>{message&&<p role="status" className="rounded-lg bg-violet-50 p-3 text-sm">{message}</p>}<button disabled={busy||!form.display_name.trim()} className="rounded-xl bg-violet-700 px-6 py-3 text-sm font-bold text-white disabled:opacity-50">{busy?'Enregistrement…':'Enregistrer les modifications'}</button></form></section>
}
