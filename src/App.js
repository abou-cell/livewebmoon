import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Login from "./components/Login";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

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
