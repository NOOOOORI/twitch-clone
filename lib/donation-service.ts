import { db } from "./db";
import { getSelf } from "./auth-service";

export const getDonationsByStreamer = async () => {
  const self = await getSelf();

  const donations = await db.donation.findMany({
    where: { streamerId: self.id },
    orderBy: { createdAt: "desc" },
  });

  const total = donations.reduce((sum, donation) => sum + donation.amount, 0);

  return { donations, total };
};
