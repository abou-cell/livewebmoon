import * as functions from "firebase-functions";
import Stripe from "stripe";

const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2022-11-15",
});

export const createCheckoutSession = functions.https.onCall(async (data, context) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: { name: "Crédits" },
          unit_amount: 500,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
    metadata: {
      userId: context.auth?.uid || "",
      credits: 10,
    },
  });

  return { sessionId: session.id };
});
