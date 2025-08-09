import * as functions from "firebase-functions";

export const systemStatus = functions.https.onRequest((req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  res.json({
    status: "online",
    updatedAt: new Date().toISOString(),
    metrics: { latency: 120 }
  });
});
