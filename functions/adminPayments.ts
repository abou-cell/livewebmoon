import * as functions from "firebase-functions";

export const adminPayments = functions.https.onRequest(async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const transactions = [
    {
      id: "tx_1",
      customer: "alice@example.com",
      pack: "20 crédits",
      amountEuro: 18,
      feesEuro: 0.7,
      status: "succeeded",
      date: new Date().toISOString(),
      receiptUrl: "https://example.com/receipt/tx_1",
    },
  ];

  const payouts = [
    {
      id: "po_1",
      period: "Jan 2024",
      grossEuro: 100,
      feesEuro: 5,
      netEuro: 95,
      status: "pending",
    },
  ];

  res.json({ transactions, payouts });
});
