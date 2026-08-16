/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `OTPVerification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orders` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "orders" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "FoodItems" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Orders" INTEGER NOT NULL,

    CONSTRAINT "FoodItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FoodItems_Name_key" ON "FoodItems"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "OTPVerification_email_key" ON "OTPVerification"("email");
