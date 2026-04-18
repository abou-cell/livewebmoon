import * as functions from "firebase-functions";

export const adminSettings = functions.https.onRequest(async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const settings = {
    maintenance: false,
    publicName: "LiveWebMoon",
    supportEmail: "support@example.com",
  };

  res.json({ settings });
});
