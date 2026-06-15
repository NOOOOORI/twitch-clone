import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/theme-provider";
import { LastLoginRecorder } from "@/components/auth/last-login-recorder";

const inter = Inter({ subsets: ["latin"] });

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Twitch - みんなでプレイしよう！",
    template: "%s | Twitch",
  },
  description:
    "誰でも配信・視聴ができるライブストリーミングサイトです。OBS Studioと連携してすぐに配信を開始できます。",
  openGraph: {
    title: "Twitch - みんなでプレイしよう！",
    description:
      "誰でも配信・視聴ができるライブストリーミングサイトです。OBS Studioと連携してすぐに配信を開始できます。",
    siteName: "Twitch",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Twitch - みんなでプレイしよう！",
    description:
      "誰でも配信・視聴ができるライブストリーミングサイトです。OBS Studioと連携してすぐに配信を開始できます。",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            storageKey="twitch clone"
          >
            <Toaster theme="light" position="bottom-center" />
            <LastLoginRecorder />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
