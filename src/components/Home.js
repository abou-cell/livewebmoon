import { Link } from "react-router-dom";

const mockStreams = [
  {
    id: "1",
    title: "Live Coding Session",
    thumbnail: "https://via.placeholder.com/300x200?text=Stream+1",
    viewers: 120,
  },
  {
    id: "2",
    title: "Music Live",
    thumbnail: "https://via.placeholder.com/300x200?text=Stream+2",
    viewers: 85,
  },
];

const features = [
  {
    title: "Connexion",
    description: "Accédez à votre compte et retrouvez vos flux favoris.",
    link: "/login",
    action: "Se connecter",
    icon: "🔑",
  },
  {
    title: "Regarder un live",
    description: "Découvrez les streams en direct de la communauté.",
    link: "/stream/1",
    action: "Explorer",
    icon: "📺",
  },
  {
    title: "Espace streamer",
    description: "Démarrez votre propre livestream en quelques clics.",
    link: "/streamer",
    action: "Commencer",
    icon: "🎙️",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-center py-20">
        <h1 className="text-5xl font-extrabold mb-4">LiveWebMoon</h1>
        <p className="mb-8 text-lg">
          La plateforme communautaire pour regarder et partager des livestreams.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-violet-600 rounded-md shadow-lg transition hover:scale-105"
          >
            Connexion
          </Link>
          <Link
            to="/streamer"
            className="px-6 py-3 bg-white text-violet-600 rounded-md shadow-lg transition hover:scale-105"
          >
            Démarrer un stream
          </Link>
        </div>
      </section>

      <section className="p-8 grid gap-6 md:grid-cols-3 -mt-10">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-md shadow-md p-6 flex flex-col transition transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <span className="text-2xl mr-2">{feature.icon}</span>
              {feature.title}
            </h3>
            <p className="flex-grow mb-4">{feature.description}</p>
            <Link
              to={feature.link}
              className="self-start px-4 py-2 bg-violet-500 text-white rounded-md shadow-md transition hover:scale-105"
            >
              {feature.action}
            </Link>
          </div>
        ))}
      </section>

      <section className="p-8 bg-gray-50 flex-1">
        <h2 className="text-2xl font-bold mb-4">Streams populaires</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {mockStreams.map((stream) => (
            <div key={stream.id} className="bg-white rounded-md shadow-md overflow-hidden">
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{stream.title}</h3>
                  <p className="text-sm text-gray-500">{stream.viewers} spectateurs</p>
                </div>
                <Link
                  to={`/stream/${stream.id}`}
                  className="px-4 py-2 bg-violet-500 text-white rounded-md shadow-md transition hover:scale-105"
                >
                  Rejoindre
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
