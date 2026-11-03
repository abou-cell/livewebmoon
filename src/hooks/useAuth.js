import { createContext, createElement, useContext, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!supabase) return
    let active = true
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return
      setUser(error ? null : data.user)
      setLoading(false)
    }).catch(() => { if (active) setLoading(false) })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) { setUser(session?.user ?? null); setLoading(false) }
    })
    return () => { active = false; subscription.unsubscribe() }
  }, [])

  const ensureClient = () => {
    if (!supabase) throw new Error('Supabase non configuré pour ce déploiement.')
    return supabase
  }
  const unwrap = async promise => {
    const { data, error } = await promise
    if (error) throw error
    return data
  }
  return createElement(AuthContext.Provider, {
    value: {
      user,
      loading,
      configured: isSupabaseConfigured,
      signIn: (email, password) => unwrap(ensureClient().auth.signInWithPassword({ email, password })),
      register: (email, password) => unwrap(ensureClient().auth.signUp({ email, password })),
      signInWithGoogle: () => unwrap(ensureClient().auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + import.meta.env.BASE_URL }
      })),
      logout: () => unwrap(ensureClient().auth.signOut()),
    }
  }, children)
}

export function useAuth() { return useContext(AuthContext) }
