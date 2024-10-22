/*
  Warnings:

  - Added the required column `shortName` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "shortName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "balance" SET DEFAULT 1000;
