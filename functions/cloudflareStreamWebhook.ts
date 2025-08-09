import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

export const cloudflareStreamWebhook = functions.https.onRequest(async (req, res) => {
  const event = req.body;
  const type = event.type;
  const data = event.data?.[0] ?? event.data;

  const docRef = admin.firestore().collection("liveStreams").doc("current");

  if (type === "live_stream.started") {
    await docRef.set(
      {
        isStreaming: true,
        streamId: data.id,
        startedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  } else if (type === "live_stream.ended") {
    await docRef.set(
      {
        isStreaming: false,
        endedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  res.json({ received: true });
});
