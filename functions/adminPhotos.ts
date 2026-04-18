import * as functions from "firebase-functions";

export const adminPhotos = functions.https.onRequest(async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const photos = [
    {
      id: "1",
      title: "Photo d'exemple",
      priceCredits: 5,
      views: 120,
      purchases: 30,
      revenue: 150,
      status: "published",
      createdAt: new Date().toISOString(),
      thumbnailUrl: "https://placehold.co/100x100",
    },
  ];

  res.json({ photos });
});
