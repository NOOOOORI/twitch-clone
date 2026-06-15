import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export const getStripe = () => {
  if (!stripeInstance) {
    if (!process.env.STRIPE_API_KEY) {
      throw new Error("STRIPE_API_KEY is not set");
    }

    stripeInstance = new Stripe(process.env.STRIPE_API_KEY, {
      typescript: true,
    });
  }

  return stripeInstance;
};
