"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState, useTransition, useRef, ElementRef } from "react";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthings";
import { useRouter } from "next/navigation";
import { Hint } from "../hint";
import { Trash } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
  initialDescription: string | null;
  initialScheduledAt: Date | null;
  initialScheduledDescription: string | null;
}

const toDatetimeLocalValue = (date: Date | null) => {
  if (!date) return "";

  return format(date, "yyyy-MM-dd'T'HH:mm");
};

export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
  initialDescription,
  initialScheduledAt,
  initialScheduledDescription,
}: InfoModalProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const [description, setDescription] = useState(initialDescription ?? "");
  const [scheduledAt, setScheduledAt] = useState(
    toDatetimeLocalValue(initialScheduledAt)
  );
  const [scheduledDescription, setScheduledDescription] = useState(
    initialScheduledDescription ?? ""
  );

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success("削除しました");
          setThumbnailUrl("");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("エラーが発生しました"));
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({
        name,
        description: description || null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        scheduledDescription: scheduledDescription || null,
      })
        .then(() => {
          toast.success("ストリーム情報を更新しました");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("エラーが発生しました"));
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          修正
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ストリーム情報の修正</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>名前</Label>
            <Input
              placeholder="ストリーム名"
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label>配信概要</Label>
            <Textarea
              placeholder="今回の配信内容について説明しましょう"
              value={description}
              maxLength={500}
              disabled={isPending}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>サムネイル</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="削除する" asChild side="left">
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      aria-label="削除する"
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  alt="サムネイル"
                  src={thumbnailUrl}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#ffffff",
                    },
                    allowedContent: {
                      color: "#fffffff",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                    router.refresh();
                    closeRef?.current?.click();
                  }}
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>次回配信予定日時</Label>
            <Input
              type="datetime-local"
              value={scheduledAt}
              disabled={isPending}
              onChange={(e) => setScheduledAt(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>次回配信の予定内容</Label>
            <Textarea
              placeholder="次回配信の内容や見どころを書いてみましょう"
              value={scheduledDescription}
              maxLength={500}
              disabled={isPending}
              onChange={(e) => setScheduledDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                キャンセル
              </Button>
            </DialogClose>
            <Button variant="primary" type="submit" disabled={isPending}>
              保存
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
