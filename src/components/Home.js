import { Link } from "react-router-dom";

const mockStreams = [
  {
    id: "1",
    title: "Live Coding Session",
    thumbnail: "https://via.placeholder.com/300x200?text=Stream+1",
  },
  {
    id: "2",
    title: "Music Live",
    thumbnail: "https://via.placeholder.com/300x200?text=Stream+2",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex flex-col items-center justify-center text-center py-16 bg-gray-50">
        <h1 className="text-4xl font-bold text-violet-600 mb-4">LiveWebMoon</h1>
        <p className="mb-8 text-lg">Explore live streams from around the world.</p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-violet-500 text-white rounded-md shadow-md transition hover:scale-105"
          >
            Login
          </Link>
          <Link
            to="/streamer"
            className="px-4 py-2 bg-violet-500 text-white rounded-md shadow-md transition hover:scale-105"
          >
            Streamer Panel
          </Link>
        </div>
      </section>
      <section className="p-8 grid gap-6 md:grid-cols-2">
        {mockStreams.map((stream) => (
          <div key={stream.id} className="bg-white rounded-md shadow-md overflow-hidden">
            <img src={stream.thumbnail} alt={stream.title} className="w-full h-48 object-cover" />
            <div className="p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">{stream.title}</h3>
              <Link
                to={`/stream/${stream.id}`}
                className="px-4 py-2 bg-violet-500 text-white rounded-md shadow-md transition hover:scale-105"
              >
                Join
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
