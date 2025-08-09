import { Link } from "react-router-dom";

const mockStreams = [
  { id: "1", title: "Live Coding Session", thumbnail: "https://via.placeholder.com/300x200" },
  { id: "2", title: "Music Jam", thumbnail: "https://via.placeholder.com/300x200" },
];

const Home = () => {
  const streams = mockStreams;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Lives en cours</h2>
      {streams.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className="bg-white rounded-md shadow-md p-4 flex flex-col items-center"
            >
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="mb-2 w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mb-2 text-center">
                {stream.title}
              </h3>
              <Link
                to={`/stream/${stream.id}`}
                className="px-4 py-2 bg-violet-500 text-white rounded-md shadow-md transition hover:scale-105"
              >
                Voir le live
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun live pour le moment</p>
      )}
    </div>
  );
};

export default Home;

