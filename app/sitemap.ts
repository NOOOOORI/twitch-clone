import type { MetadataRoute } from "next";

import { db } from "@/lib/db";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: appUrl, changeFrequency: "hourly", priority: 1 },
    { url: `${appUrl}/search`, changeFrequency: "daily", priority: 0.5 },
    { url: `${appUrl}/help`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const users = await db.user.findMany({
    select: { username: true, updatedAt: true },
  });

  const userRoutes: MetadataRoute.Sitemap = users.map((user) => ({
    url: `${appUrl}/${user.username}`,
    lastModified: user.updatedAt,
    changeFrequency: "hourly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...userRoutes];
}
