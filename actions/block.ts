"use server";

import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";

const RoomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  const self = await getSelf();

  let blockedUser;

  try {
    blockedUser = await blockUser(id);
  } catch (error) {
    // blockUser failed, but we still try to remove participant from room
    // This could happen if user is already blocked or other validation errors
  }

  try {
    await RoomService.removeParticipant(self.id, id);
  } catch (error) {
    // User is not in the room or room doesn't exist
    // This is not a critical error, so we continue
  }

  revalidatePath(`/u/${self.username}/community`);

  if (!blockedUser) {
    throw new Error("ブロックに失敗しました");
  }

  return blockedUser;
};

export const onUnblock = async (id: string) => {
  const self = await getSelf();
  const unblockedUser = await unblockUser(id);

  revalidatePath(`/u/${self.username}/community`);

  return unblockedUser;
};
