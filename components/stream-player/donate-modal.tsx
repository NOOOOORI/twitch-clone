"use client";

import { useState, useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Gift } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { createDonationCheckout } from "@/actions/donation";
import { cn } from "@/lib/utils";

const AMOUNT_OPTIONS = [100, 300, 500, 1000, 3000, 5000];

interface DonateModalProps {
  hostIdentity: string;
}

export const DonateModal = ({ hostIdentity }: DonateModalProps) => {
  const [amount, setAmount] = useState(AMOUNT_OPTIONS[1]);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const { userId } = useAuth();
  const router = useRouter();

  const onSubmit = () => {
    if (!userId) {
      return router.push("/sign-in");
    }

    startTransition(() => {
      createDonationCheckout(hostIdentity, amount, message)
        .then(({ url }) => {
          window.location.href = url;
        })
        .catch(() => toast.error("エラーが発生しました"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm" className="w-full lg:w-auto">
          <Gift className="h-4 w-4 mr-2" />
          投げ銭
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>投げ銭する</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2">
          {AMOUNT_OPTIONS.map((value) => (
            <Button
              key={value}
              type="button"
              disabled={isPending}
              variant={amount === value ? "primary" : "outline"}
              onClick={() => setAmount(value)}
            >
              ¥{value.toLocaleString()}
            </Button>
          ))}
        </div>
        <Textarea
          placeholder="応援メッセージ（任意）"
          value={message}
          maxLength={200}
          disabled={isPending}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <DialogClose asChild>
            <Button variant="ghost" disabled={isPending}>
              キャンセル
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            onClick={onSubmit}
            variant="primary"
            className={cn(isPending && "opacity-70")}
          >
            ¥{amount.toLocaleString()} 投げ銭する
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
