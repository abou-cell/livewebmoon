import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { logout } = useAuth();
  return (
      <header className="p-4 bg-white shadow-lg rounded-2xl flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-primary">LiveWebMoon</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-primary text-white rounded-2xl shadow-lg transition hover:scale-105"
        >
          Déconnexion
        </button>
      </header>
  );
};

export default Header;
