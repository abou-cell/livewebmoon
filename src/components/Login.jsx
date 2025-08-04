import { useState } from "react";
import { auth } from "../firebase/firebaseConfig.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h1 className="text-xl font-semibold mb-4 text-center text-gray-700">
          {isNew ? "Créer un compte" : "Connexion"}
        </h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          className="w-full p-2 mb-3 border rounded-lg"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 mb-3 border rounded-lg"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          {isNew ? "Créer un compte" : "Se connecter"}
        </button>
        <p
          className="text-center mt-4 text-sm text-primary cursor-pointer"
          onClick={() => setIsNew(!isNew)}
        >
          {isNew ? "Déjà inscrit ? Se connecter" : "Pas encore inscrit ? Créer un compte"}
        </p>
      </form>
    </div>
  );
}
