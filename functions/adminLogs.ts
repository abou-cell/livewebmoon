import * as functions from "firebase-functions";

export const adminLogs = functions.https.onRequest(async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const logs = [
    {
      id: "log1",
      actor: "superadmin",
      action: "UPDATE_PRICE",
      resource: "photo:1",
      createdAt: new Date().toISOString(),
    },
  ];

  res.json({ logs });
});
