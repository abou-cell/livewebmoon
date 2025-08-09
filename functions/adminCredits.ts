import * as functions from "firebase-functions";

export const adminCredits = functions.https.onRequest(async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const packs = [
    { id: "pack1", priceEuro: 5, credits: 5 },
    { id: "pack2", priceEuro: 18, credits: 20 },
    { id: "pack3", priceEuro: 40, credits: 50 },
  ];

  const promos = [
    { code: "WELCOME", discountPercent: 10, expiresAt: new Date(Date.now() + 86400000).toISOString() },
  ];

  const liveDebit = 1; // credits per minute

  res.json({ packs, promos, liveDebit });
});
