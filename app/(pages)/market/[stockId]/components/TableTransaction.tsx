/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getTrades } from "@/app/actions/trade";
import { IStock } from "@/app/actions/stock";
import { addCommas, cn } from "@/lib/utils";

interface Props {
  stock: IStock;
}

const TableTransaction = async ({ stock }: Props) => {
  const trades = await getTrades(stock.id);
  return (
    <div className="flex flex-1 flex-col justify-between space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Transaction History
      </h3>
      <div className="max-h-72 flex-1 space-y-2 overflow-y-scroll rounded-2xl border border-gray-200 p-4 scrollbar-hide">
        {/* Transaction Row */}
        {trades?.map((trade) => (
          <div className="flex flex-row items-center" key={trade.id}>
            <div className="flex flex-1 flex-row items-center gap-2">
              <img
                src={trade.stock.symbol}
                alt="logo"
                className="size-8 rounded-full"
              />
              <p className="text-sm font-semibold text-gray-800">
                {trade.stock.companyName}
              </p>
            </div>
            <div className="flex flex-1 flex-row items-center justify-between">
              <p className="min-w-14 text-sm text-gray-400">
                Day {trade.tradeDay}
              </p>
              <p
                className={cn(
                  "text-sm capitalize min-w-10",
                  trade.tradeType === "buy" ? "text-primary" : "text-red-600"
                )}
              >
                {trade.tradeType}
              </p>
              <p className="min-w-16 text-sm text-gray-400">{trade.quantity}</p>
              <p className="min-w-16 text-sm text-gray-400">
                ${addCommas(Number(trade.totalPrice.toFixed(2)))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableTransaction;
