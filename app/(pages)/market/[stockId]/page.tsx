import React from "react";
import TableTransaction from "./components/TableTransaction";
import { getStockById } from "@/app/actions/stock";
import StockInfo from "./components/StockInfo";
import UserInfo from "./components/UserInfo";
import OrderStock from "./components/OrderStock";
import DynamicCandle from "./components/DynamicCandle";
import ButtonNextDay from "./components/ButtonNextDay";

const MarketDetailPage = async ({
  params,
}: {
  params: { stockId: string };
}) => {
  const stock = await getStockById(Number(params.stockId));

  if (!stock) {
    return (
      <div>
        <h1>Stock not found</h1>
      </div>
    );
  }

  return (
    <div>
      {/* Charts */}
      <div className="space-y-12">
        <div className="flex flex-col items-start gap-8 md:flex-row md:justify-between">
          <StockInfo stock={stock} />
          <div>
            <ButtonNextDay />
          </div>
        </div>
        <div className="h-[500px]">
          <DynamicCandle data={stock.candlesticks!} />
        </div>
      </div>
      {/* Trading Panel */}
      <div className="mt-8 space-y-8">
        <div className="flex flex-col md:flex-row">
          <h2 className="flex-1 text-2xl font-semibold text-gray-800">
            Trading Panel
          </h2>
          <UserInfo stock={stock} />
        </div>
        <div className="flex flex-col gap-8 md:flex-row">
          <OrderStock stock={stock} />
          <TableTransaction stock={stock} />
        </div>
      </div>
    </div>
  );
};

export default MarketDetailPage;
