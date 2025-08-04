import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { logout } = useAuth();
  return (
    <header className="p-4 bg-white shadow-md flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold text-violet-600">LiveWebMoon</h1>
      <button
        onClick={logout}
        className="px-4 py-2 bg-violet-500 text-white rounded-md shadow-md transition hover:scale-105"
      >
        Déconnexion
      </button>
    </header>
  );
};

export default Header;
