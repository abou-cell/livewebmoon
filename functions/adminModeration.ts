import * as functions from "firebase-functions";

export const adminModeration = functions.https.onRequest(async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const reports = [
    {
      id: "rep1",
      type: "content",
      author: "alice@example.com",
      target: "photo:1",
      summary: "Contenu inapproprié",
      status: "open",
      priority: "urgent",
      createdAt: new Date().toISOString(),
    },
  ];

  res.json({ reports });
});
