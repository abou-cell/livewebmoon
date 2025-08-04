import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig.js";
import Login from "./components/Login.jsx";

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

  return user ? (
    <div className="text-center p-10">
      <h1 className="text-2xl">Bienvenue {user.email}</h1>
      <button
        onClick={() => auth.signOut()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Déconnexion
      </button>
    </div>
  ) : (
    <Login onLogin={() => {}} />
  );
}

export default App;
