"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export const LAST_LOGIN_METHOD_KEY = "lastLoginMethod";

export const LastLoginRecorder = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const method = user.externalAccounts[0]?.provider ?? "email";

    localStorage.setItem(LAST_LOGIN_METHOD_KEY, method);
  }, [isLoaded, isSignedIn, user]);

  return null;
};
