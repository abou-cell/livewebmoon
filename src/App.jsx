import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Login from './routes/Login'
import UserDashboard from './routes/Dashboard'
import StreamerPanel from './routes/StreamerPanel'
import StreamPlayer from './routes/StreamPlayer'
import CreatorAdmin from './routes/CreatorAdmin'
import Subscriber from './routes/Subscriber'
import AdminLayout from './routes/admin/AdminLayout'
import AdminDashboard from './routes/admin/Dashboard'
import AdminLive from './routes/admin/Live'
import AdminPhotos from './routes/admin/Photos'
import AdminVideos from './routes/admin/Videos'
import RequireSuperAdmin from './routes/admin/RequireSuperAdmin'
import AdminCredits from './routes/admin/Credits'
import AdminPayments from './routes/admin/Payments'
import AdminModeration from './routes/admin/Moderation'
import AdminLogs from './routes/admin/Logs'
import AdminSettings from './routes/admin/Settings'
import AdminSupport from './routes/admin/Support'

export default function App() {
  return (
    <div className="bg-background min-h-screen text-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/streamer" element={<StreamerPanel />} />
        <Route path="/watch/:id" element={<StreamPlayer />} />
        <Route
          path="/admin"
          element={
            <RequireSuperAdmin>
              <AdminLayout />
            </RequireSuperAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="live" element={<AdminLive />} />
          <Route path="photos" element={<AdminPhotos />} />
          <Route path="videos" element={<AdminVideos />} />
          <Route path="credits" element={<AdminCredits />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="moderation" element={<AdminModeration />} />
          <Route path="logs" element={<AdminLogs />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="support" element={<AdminSupport />} />
        </Route>
        <Route path="/creator-admin" element={<CreatorAdmin />} />
        <Route path="/subscriber" element={<Subscriber />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}
