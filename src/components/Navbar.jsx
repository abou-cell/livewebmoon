import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `transition-colors ${isActive ? 'text-primary font-bold' : 'text-gray-400 hover:text-primary'}`

  return (
    <nav aria-label="Navigation principale" className="p-4 bg-surface border-b border-gray-700 mb-4 shadow">
      <ul className="flex space-x-4">
        <li><NavLink to="/" end className={linkClass}>Accueil</NavLink></li>
        <li><NavLink to="/login" className={linkClass}>Connexion</NavLink></li>
        <li><NavLink to="/dashboard" className={linkClass}>Tableau de bord</NavLink></li>
        <li><NavLink to="/streamer" className={linkClass}>Streamer</NavLink></li>
      </ul>
    </nav>
  )
}
