import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-3xl font-bold text-violet-600 mb-6">Bienvenue sur LiveWebMoon</h1>
      <p
        className="mb-8 text-lg max-w-md"
        title="Créez un compte pour suivre vos streamers préférés et participer au chat"
      >
        Créez un compte pour suivre vos streamers préférés et participer aux discussions en direct.
      </p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-violet-500 text-white rounded-md shadow-md transition hover:scale-105"
          title="Accédez à votre compte"
        >
          Se connecter
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-violet-500 text-white rounded-md shadow-md transition hover:scale-105"
          title="Créer un nouveau compte"
        >
          S’inscrire
        </Link>
      </div>
    </div>
  );
};

export default Home;
