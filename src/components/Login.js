import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn, register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-primary">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        <div className="flex gap-2">
            <button
              onClick={handleLogin}
              className="flex-1 bg-primary text-white p-2 rounded-2xl hover:bg-primary/90 transition shadow-lg"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="flex-1 bg-gray-200 text-gray-700 p-2 rounded-2xl hover:bg-gray-300 transition shadow-lg"
            >
              Register
            </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
