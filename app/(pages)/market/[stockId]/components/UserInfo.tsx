import { getStockHoldingById, IStock } from "@/app/actions/stock";
import { getBuyTrades } from "@/app/actions/trade";
import { checkUser } from "@/lib/checkUser";
import { addCommas, cn, getLatestCandleStick } from "@/lib/utils";
import React from "react";

const UserInfo = async ({ stock }: { stock: IStock }) => {
  const user = await checkUser();
  const latestStick = getLatestCandleStick(stock.candlesticks!);
  const totalHoldingShared = await getStockHoldingById(stock.id);
  const allBuyTrades = await getBuyTrades(stock.id);

  if (!allBuyTrades) {
    return null;
  }
  // Total Shares Purchased
  const totalBuyShares = allBuyTrades?.reduce(
    (total, currentTrade) => total + currentTrade.quantity,
    0
  );
  // Weighted Average Purchase Price
  const averageBuyPrice = totalBuyShares
    ? allBuyTrades!.reduce(
        (total, current) => total + current.quantity * current.price,
        0
      ) / totalBuyShares!
    : 0;
  // Unrealied profit/loss
  const unrealizedProfitLoss = latestStick
    ? (latestStick?.close - averageBuyPrice) * totalHoldingShared
    : 0;

  return (
    <div className="flex flex-1 flex-row justify-between">
      <div className="space-y-1">
        <p className="text-base text-gray-800">Account Balance</p>
        <p className="text-base text-gray-400">
          ${addCommas(Number(user?.balance.toFixed(3)) || 0)}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-base text-gray-800">Share</p>
        <p className="text-base text-gray-400">
          {totalHoldingShared.toFixed(2)}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-base text-gray-800">Profit/Loss</p>
        <p
          className={cn(
            "text-base",
            unrealizedProfitLoss > 0 ? "text-green-500" : "text-red-500"
          )}
        >
          ${unrealizedProfitLoss.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
