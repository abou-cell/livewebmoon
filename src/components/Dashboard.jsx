export default function Dashboard({ user }) {
  return (
    <main className="max-w-5xl mx-auto p-6 grid gap-6 sm:grid-cols-2">
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Bienvenue</h2>
        <p className="text-gray-600">Vous êtes connecté avec {user.email}.</p>
      </div>
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Nouvelle interface</h2>
        <p className="text-gray-600">
          Cette application utilise un thème moderne basé sur Tailwind CSS.
        </p>
      </div>
    </main>
  );
}
