/* eslint-disable @next/next/no-img-element */
import React from "react";

import { cn } from "@/lib/utils";
import { IStock } from "@/app/actions/stock";

type Props = {
  isHorizontal?: boolean;
  stock: IStock;
};

const LogoCompany = ({ stock, isHorizontal = true }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        isHorizontal ? "flex-row" : "flex-col items-start"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <img src={stock.symbol} alt="logo" className="size-10 rounded-full" />
        <p className="rounded-sm bg-gray-100 px-2 py-0.5">{stock.shortName}</p>
      </div>
      <p className="text-left text-base font-semibold text-gray-800">
        {stock.companyName}
      </p>
    </div>
  );
};

export default LogoCompany;
