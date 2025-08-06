import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import StreamerPanel from "./routes/StreamerPanel";
import StreamPlayer from "./routes/StreamPlayer";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

const StreamPlayerWrapper = () => {
  const { id } = useParams();
  return <StreamPlayer streamId={id} />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/streamer"
            element={
              <PrivateRoute>
                <StreamerPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="/stream/:id"
            element={
              <PrivateRoute>
                <StreamPlayerWrapper />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
