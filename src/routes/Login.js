import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { signIn, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        await register(email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 p-2 rounded-2xl transition shadow-md ${
              mode === "login" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Se connecter
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 p-2 rounded-2xl transition shadow-md ${
              mode === "register" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            S'inscrire
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded-2xl hover:bg-primary/90 transition shadow-lg"
        >
          {mode === "login" ? "Connexion" : "Inscription"}
        </button>
      </form>
    </div>
  );
};

export default Login;
