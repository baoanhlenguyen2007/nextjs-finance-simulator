import { INITIAL_DAY } from "@/constants/utils";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 400 });
    }
    // Delete all trades associated with this user
    await db.trade.deleteMany({
      where: { userId },
    });
    // Reset simulation currentDay to 1
    await db.simulation.update({
      where: { userId },
      data: {
        currentDay: INITIAL_DAY,
      },
    });
    return new NextResponse("User reset successfully", { status: 200 });
  } catch (error) {
    console.log(`RESET_USER_ERROR: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
