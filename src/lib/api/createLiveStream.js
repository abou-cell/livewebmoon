import axios from "axios";

export async function createLiveStream() {
  try {
    const res = await axios.post("/api/createLiveStream");
    return res.data;
  } catch (err) {
    console.error(err);
    return { rtmpUrl: "rtmp://example.com/live", streamKey: "sampleKey", id: "mockId" };
  }
}
