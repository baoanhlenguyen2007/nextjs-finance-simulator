import { getStockHoldingById } from "@/app/actions/stock";
import { ETradeMode } from "@/constants/utils";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { stockId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json(); // Parse the JSON body from the request
    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 400 });
    }
    if (!params.stockId) {
      return new NextResponse("stock Id is missing", { status: 400 });
    }
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: { simulation: true }, // Include the user's simulation
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const { tradeType, quantity, price } = body;
    // Calculate total price
    const totalTradeValue = quantity * price;

    let updatedBalance = 0;

    if (tradeType === ETradeMode.BUY) {
      if (user.balance < totalTradeValue) {
        return new NextResponse("Insufficient balance for this trade", {
          status: 400,
        });
      }
      updatedBalance = user.balance - totalTradeValue;
    } else if (tradeType === ETradeMode.SELL) {
      const currentStockHoldings = await getStockHoldingById(
        parseInt(params.stockId)
      );
      if (currentStockHoldings < quantity) {
        return new NextResponse("Insufficient stock quantity to sell", {
          status: 400,
        });
      }
      updatedBalance = user.balance + totalTradeValue;
    }
    await db.user.update({
      where: {
        clerkUserId: userId,
      },
      data: {
        balance: updatedBalance,
      },
    });

    await db.trade.create({
      data: {
        userId,
        stockId: parseInt(params.stockId), // Ensure stockId is an integer
        tradeType,
        quantity,
        price,
        totalPrice: quantity * price, // Calculate total price
        tradeDay: user.simulation!.currentDay,
      },
    });

    const message = tradeType + "stock successfully";
    return new NextResponse(message, { status: 201 });
  } catch (error) {
    console.log(`STORES_POST:${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
