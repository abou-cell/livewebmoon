import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";

const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2022-11-15",
});

export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig as string,
      functions.config().stripe.webhook
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;
    const userId = session.metadata.userId;
    const credits = Number(session.metadata.credits);
    await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ credits: admin.firestore.FieldValue.increment(credits) });
  }

  res.json({ received: true });
});
