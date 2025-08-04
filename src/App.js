import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import StreamerPanel from "./components/StreamerPanel";
import StreamPlayer from "./components/StreamPlayer";
import Home from "./components/Home";

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
          <Route path="/" element={<Home />} />
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
