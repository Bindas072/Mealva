/*
  Warnings:

  - You are about to drop the column `Name` on the `FoodItems` table. All the data in the column will be lost.
  - You are about to drop the column `Orders` on the `FoodItems` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `FoodItems` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `FoodItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orders` to the `FoodItems` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "FoodItems_Name_key";

-- AlterTable
ALTER TABLE "FoodItems" DROP COLUMN "Name",
DROP COLUMN "Orders",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "orders" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FoodItems_name_key" ON "FoodItems"("name");
