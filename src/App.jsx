import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Login from './routes/Login'
import Dashboard from './routes/Dashboard'
import StreamerPanel from './routes/StreamerPanel'
import StreamPlayer from './routes/StreamPlayer'
import SuperAdmin from './routes/SuperAdmin'
import CreatorAdmin from './routes/CreatorAdmin'
import Subscriber from './routes/Subscriber'

export default function App() {
  return (
    <div className="bg-background min-h-screen text-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/streamer" element={<StreamerPanel />} />
        <Route path="/watch/:id" element={<StreamPlayer />} />
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route path="/creator-admin" element={<CreatorAdmin />} />
        <Route path="/subscriber" element={<Subscriber />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}
