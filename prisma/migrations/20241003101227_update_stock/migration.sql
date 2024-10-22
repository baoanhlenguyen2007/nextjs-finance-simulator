/*
  Warnings:

  - You are about to drop the column `closePrice` on the `CandlestickData` table. All the data in the column will be lost.
  - You are about to drop the column `highPrice` on the `CandlestickData` table. All the data in the column will be lost.
  - You are about to drop the column `lowPrice` on the `CandlestickData` table. All the data in the column will be lost.
  - You are about to drop the column `openPrice` on the `CandlestickData` table. All the data in the column will be lost.
  - Added the required column `close` to the `CandlestickData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `high` to the `CandlestickData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `low` to the `CandlestickData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `open` to the `CandlestickData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CandlestickData" DROP COLUMN "closePrice",
DROP COLUMN "highPrice",
DROP COLUMN "lowPrice",
DROP COLUMN "openPrice",
ADD COLUMN     "close" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "high" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "low" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "open" DOUBLE PRECISION NOT NULL;
