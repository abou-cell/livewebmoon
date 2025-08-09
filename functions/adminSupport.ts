import * as functions from "firebase-functions";

export const adminSupport = functions.https.onRequest(async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const tickets = [
    {
      id: "ticket1",
      status: "open",
      priority: "high",
      customer: "bob@example.com",
      lastMessage: "Besoin d'aide pour le paiement",
      createdAt: new Date().toISOString(),
    },
  ];

  res.json({ tickets });
});
