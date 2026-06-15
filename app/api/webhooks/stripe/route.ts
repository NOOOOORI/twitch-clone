import { headers } from "next/headers";
import Stripe from "stripe";

import { db } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");

  if (!signature) {
    return new Response("No signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { streamerId, message, supporterName } = session.metadata ?? {};

    if (!streamerId || !session.amount_total) {
      return new Response("Missing metadata", { status: 400 });
    }

    await db.donation.create({
      data: {
        amount: session.amount_total,
        message: message || null,
        supporterName: supporterName || "匿名",
        streamerId,
        stripeSessionId: session.id,
      },
    });
  }

  return new Response(null, { status: 200 });
}
