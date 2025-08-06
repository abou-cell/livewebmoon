import { useState } from "react";
import { createLiveStream } from "../lib/api/createLiveStream";

const StreamerPanel = () => {
  const [stream, setStream] = useState(null);

  const handleCreate = async () => {
    const data = await createLiveStream();
    setStream(data);
  };

  return (
    <div className="p-4">
      <button
        onClick={handleCreate}
        className="px-4 py-2 bg-primary text-white rounded-2xl shadow-lg transition hover:scale-105"
      >
        Lancer mon live
      </button>
      {stream && (
        <div className="mt-4 space-y-2">
          <div>
            <strong>URL RTMP:</strong> {stream.rtmpUrl}
          </div>
          <div>
            <strong>Stream Key:</strong> {stream.streamKey}
          </div>
          <iframe
            src={`https://videodelivery.net/${stream.id}/iframe`}
            className="w-full h-64 rounded-2xl"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="stream"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default StreamerPanel;
