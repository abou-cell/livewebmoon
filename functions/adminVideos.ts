import * as functions from "firebase-functions";

export const adminVideos = functions.https.onRequest(async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const videos = [
    {
      id: "1",
      title: "Vidéo d'exemple",
      duration: 120,
      priceCredits: 7,
      purchases: 10,
      revenue: 70,
      status: "published",
      createdAt: new Date().toISOString(),
      thumbnailUrl: "https://placehold.co/100x100",
      encoding: "ready",
    },
  ];

  res.json({ videos });
});
