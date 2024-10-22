import React from "react";
import LogoCompany from "./LogoCompany";
import InterestRate from "./InterestRate";
import Link from "next/link";
import { IStock } from "@/app/actions/stock";
import { addCommas, getLatestCandleStick } from "@/lib/utils";

type Props = {
  stock: IStock;
};

const CardMarket = ({ stock }: Props) => {
  const latestStick = getLatestCandleStick(stock.candlesticks!);
  const change = latestStick ? latestStick?.close - latestStick?.open : 0;
  const percentChange = latestStick ? (change / latestStick?.open) * 100 : 0;
  return (
    <Link href={`/market/${stock.id}`}>
      <div className="flex flex-col items-start rounded-2xl bg-white p-6 shadow-app">
        <LogoCompany isHorizontal={false} stock={stock} />
        <div className="mt-4 w-full space-y-2">
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-400">Price</p>
            <p className="text-sm text-gray-800">
              ${addCommas(Number(latestStick?.close))}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-400">Change</p>
            <div className="text-sm text-gray-800">
              <InterestRate value={percentChange} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardMarket;
