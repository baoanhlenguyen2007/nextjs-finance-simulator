"use server";

import { INITIAL_DAY, INTIAL_BALANCE } from "@/constants/utils";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const nextDay = async () => {
  try {
    const { userId } = auth();
    await db.simulation.update({
      where: { userId: userId! },
      data: {
        currentDay: {
          increment: 1, // Increment currentDay by 1
        },
      },
    });
    revalidatePath("/market/");
  } catch (error) {
    console.log(error);
  }
};

const resetDay = async () => {
  try {
    const { userId } = auth();
    // Delete all trades associated with this user
    await db.trade.deleteMany({
      where: { userId: userId! },
    });
    // Reset simulation currentDay to 1
    await db.simulation.update({
      where: { userId: userId! },
      data: {
        currentDay: INITIAL_DAY,
      },
    });
    await db.user.update({
      where: { clerkUserId: userId! },
      data: {
        balance: INTIAL_BALANCE,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};

export { nextDay, resetDay };
