import { auth } from "../firebase/firebaseConfig.js";

export default function Header({ user }) {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold">LiveWebMoon</h1>
        {user && (
          <button
            onClick={() => auth.signOut()}
            className="px-3 py-1 bg-secondary rounded-md hover:bg-secondary/80 transition"
          >
            Déconnexion
          </button>
        )}
      </div>
    </header>
  );
}
