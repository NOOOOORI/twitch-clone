"use server";

import { currentUser } from "@clerk/nextjs";

import { stripe } from "@/lib/stripe";
import { getUserById } from "@/lib/user-service";

export const createDonationCheckout = async (
  streamerId: string,
  amount: number,
  message?: string
) => {
  if (!Number.isInteger(amount) || amount < 100 || amount > 50000) {
    throw new Error("金額は100円〜50,000円の範囲で指定してください");
  }

  const streamer = await getUserById(streamerId);

  if (!streamer) {
    throw new Error("配信者が見つかりません");
  }

  const supporter = await currentUser();

  if (!supporter) {
    throw new Error("Unauthorized");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "jpy",
          product_data: {
            name: `${streamer.username}への投げ銭`,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    metadata: {
      streamerId,
      message: message?.slice(0, 200) ?? "",
      supporterName: supporter.username ?? "匿名",
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/${streamer.username}?donation=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/${streamer.username}?donation=cancel`,
  });

  if (!session.url) {
    throw new Error("Checkoutセッションの作成に失敗しました");
  }

  return { url: session.url };
};
