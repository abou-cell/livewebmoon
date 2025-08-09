import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

// Simple RBAC guard: only allow a specific super admin email
const SUPER_ADMIN_EMAIL = 'admin@example.com'

export default function RequireSuperAdmin({ children }) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (user.email !== SUPER_ADMIN_EMAIL) return <Navigate to="/" replace />

  return children
}
