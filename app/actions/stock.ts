import { ETradeMode } from "@/constants/utils";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export interface ICandleStick {
  id: number;
  stockId: number;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  date: string;
  simulationDay: number;
}

export interface IStock {
  id: number;
  symbol: string;
  companyName: string;
  shortName: string;
  currentPrice: number;
  openingPrice: number;
  closingPrice: number;
  volume: number;
  candlesticks?: ICandleStick[];
}

async function getStocks(): Promise<IStock[] | null> {
  const { userId } = auth();
  try {
    const userSimulation = await db.simulation.findUnique({
      where: {
        userId: userId!,
      },
      select: {
        currentDay: true, // Select only the current simulation day
      },
    });
    if (!userSimulation) {
      throw new Error("Simulation not found for the user");
    }
    const stocks = await db.stock.findMany({
      include: {
        candlesticks: {
          where: {
            simulationDay: {
              lte: userSimulation.currentDay - 1,
            },
          },
          orderBy: {
            simulationDay: "asc",
          },
        },
      },
    });
    return stocks;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getStockById(stockId: number): Promise<IStock | null> {
  const { userId } = auth();
  try {
    const userSimulation = await db.simulation.findUnique({
      where: {
        userId: userId!,
      },
      select: {
        currentDay: true, // Select only the current simulation day
      },
    });
    if (!userSimulation) {
      throw new Error("Simulation not found for the user");
    }
    const stock = await db.stock.findUnique({
      where: {
        id: stockId,
      },
      include: {
        candlesticks: {
          where: {
            simulationDay: {
              lte: userSimulation.currentDay - 1,
            },
          },
          orderBy: {
            simulationDay: "asc",
          },
        },
      },
    });
    return stock;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const getStockHoldingById = async (stockId: number) => {
  const { userId } = auth();
  const userTrades = await db.trade.findMany({
    where: {
      userId: userId!,
      stockId,
    },
  });
  let totalBought = 0;
  let totalSold = 0;

  userTrades.forEach((trade) => {
    if (trade.tradeType === ETradeMode.BUY) {
      totalBought += trade.quantity;
    } else if (trade.tradeType === ETradeMode.SELL) {
      totalSold += trade.quantity;
    }
  });

  const currentStockHoldings = totalBought - totalSold;

  return currentStockHoldings;
};

export { getStocks, getStockById, getStockHoldingById };
