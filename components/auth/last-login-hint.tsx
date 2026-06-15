"use client";

import { useEffect, useState } from "react";

import { LAST_LOGIN_METHOD_KEY } from "./last-login-recorder";

const METHOD_LABELS: Record<string, string> = {
  email: "メールアドレス",
  google: "Google",
  github: "GitHub",
  discord: "Discord",
  twitch: "Twitch",
  facebook: "Facebook",
  apple: "Apple",
  microsoft: "Microsoft",
};

export const LastLoginHint = () => {
  const [method, setMethod] = useState<string | null>(null);

  useEffect(() => {
    setMethod(localStorage.getItem(LAST_LOGIN_METHOD_KEY));
  }, []);

  if (!method) return null;

  const label = METHOD_LABELS[method] ?? method;

  return (
    <div className="text-sm text-muted-foreground bg-muted rounded-md px-4 py-2 text-center">
      前回は「{label}」でログインしました
    </div>
  );
};
