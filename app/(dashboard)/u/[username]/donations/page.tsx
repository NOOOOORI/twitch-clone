import { format } from "date-fns";

import { getDonationsByStreamer } from "@/lib/donation-service";

const DonationsPage = async () => {
  const { donations, total } = await getDonationsByStreamer();

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">投げ銭</h1>
        <p className="text-muted-foreground">
          受け取った合計: ¥{total.toLocaleString()}
        </p>
      </div>
      <div className="space-y-2">
        {donations.length === 0 && (
          <p className="text-muted-foreground">まだ投げ銭はありません</p>
        )}
        {donations.map((donation) => (
          <div key={donation.id} className="border rounded-md p-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{donation.supporterName}</p>
              <p className="font-semibold text-blue-500">
                ¥{donation.amount.toLocaleString()}
              </p>
            </div>
            {donation.message && (
              <p className="text-sm text-muted-foreground mt-1">
                {donation.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {format(new Date(donation.createdAt), "yyyy/MM/dd HH:mm")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationsPage;
