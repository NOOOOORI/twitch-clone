"use client";

import { useEffect, useState } from "react";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const IN_APP_BROWSER_PATTERNS = [
  /Instagram/i,
  /FBAN|FBAV/i,
  /Line\//i,
  /Twitter/i,
  /KAKAOTALK/i,
  /MicroMessenger/i,
  /BytedanceWebview|musical_ly|TikTok/i,
];

const isInAppBrowser = (userAgent: string) =>
  IN_APP_BROWSER_PATTERNS.some((pattern) => pattern.test(userAgent));

export const InAppBrowserBanner = () => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isInAppBrowser(navigator.userAgent)) {
      setUrl(window.location.href);
    }
  }, []);

  if (!url) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success("URLをコピーしました");
  };

  return (
    <Alert className="max-w-sm">
      <AlertTitle>アプリ内ブラウザで開いています</AlertTitle>
      <AlertDescription className="space-y-3">
        <p>
          Googleログインはアプリ内ブラウザではご利用いただけません。SafariやChromeなどの通常のブラウザでこのページを開いてください。
        </p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            URLをコピー
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              外部ブラウザで開く
            </a>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
