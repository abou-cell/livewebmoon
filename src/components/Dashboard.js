import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Header from "./Header";

const Dashboard = () => {
  const { user } = useAuth();
  const [credits] = useState(10); // mock Firestore
  const streams = [
    { id: "stream1", title: "Live Coding" },
    { id: "stream2", title: "Music Live" },
  ];

  return (
    <div className="p-4">
      <Header />
      <h2 className="text-xl mb-4">Bonjour {user?.email}</h2>
      <div className="mb-4">Crédits: {credits}</div>
      <button className="mb-6 px-4 py-2 bg-violet-500 text-white rounded-md shadow-md transition hover:scale-105">
        Recharger mes crédits
      </button>
      <ul className="space-y-2">
        {streams.map((s) => (
          <li
            key={s.id}
            className="p-4 bg-white rounded-md shadow-md flex justify-between items-center"
          >
            <span>{s.title}</span>
            <button className="px-4 py-2 bg-violet-500 text-white rounded-md shadow-md transition hover:scale-105">
              Rejoindre le live
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
