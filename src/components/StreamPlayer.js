import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const StreamPlayer = ({ streamId }) => {
  const { user } = useAuth();
  const [credits, setCredits] = useState(10);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (credits <= 0) return;
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s === 1) {
          setCredits((c) => c - 1);
          return 60;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [credits]);

  if (credits <= 0) {
    return <div className="p-4">Plus de crédits.</div>;
  }

    return (
      <div className="p-4 bg-white rounded-2xl shadow-lg">
        <iframe
          src={`https://videodelivery.net/${streamId}/iframe`}
          className="w-full h-64 rounded-2xl"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="player"
        ></iframe>
        <div className="mt-4 flex justify-between">
          <span>Crédits: {credits}</span>
          <span>Temps restant: {seconds}s</span>
        </div>
      </div>
    );
  };

export default StreamPlayer;
