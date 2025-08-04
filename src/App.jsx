import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig.js";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth) {
      setError("Configuration Firebase manquante.");
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(
      auth,
      (u) => {
        setUser(u);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      {user ? <Dashboard user={user} /> : <Login onLogin={() => {}} />}
    </div>
  );
}

export default App;
