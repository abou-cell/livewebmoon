import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "./Header";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
        <button className="mb-6 px-4 py-2 bg-primary text-white rounded-2xl shadow-lg transition hover:scale-105">
          Recharger mes crédits
        </button>
      <ul className="space-y-2">
        {streams.map((s) => (
            <li
              key={s.id}
              className="p-4 bg-white rounded-2xl shadow-lg flex justify-between items-center"
            >
              <span>{s.title}</span>
              <button
                onClick={() => navigate(`/stream/${s.id}`)}
                className="px-4 py-2 bg-primary text-white rounded-2xl shadow-lg transition hover:scale-105"
              >
                Rejoindre le live
              </button>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
