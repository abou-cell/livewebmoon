import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const debitCredits = functions.pubsub
  .schedule("every 1 minutes")
  .onRun(async () => {
    const sessions = await admin
      .firestore()
      .collection("viewingSessions")
      .where("ended", "==", false)
      .get();

    const batch = admin.firestore().batch();

    sessions.forEach((doc) => {
      const data = doc.data();
      const userRef = admin.firestore().collection("users").doc(data.userId);
      batch.update(userRef, {
        credits: admin.firestore.FieldValue.increment(-1),
      });
      if (data.credits <= 1) {
        batch.update(doc.ref, { ended: true });
      }
    });

    await batch.commit();
    return null;
  });
