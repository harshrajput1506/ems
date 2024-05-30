/*
  Warnings:

  - You are about to drop the column `mobile_harsh` on the `AadharDetails` table. All the data in the column will be lost.
  - Added the required column `mobile_hash` to the `AadharDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AadharDetails" DROP COLUMN "mobile_harsh",
ADD COLUMN     "mobile_hash" TEXT NOT NULL;
