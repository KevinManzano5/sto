/*
  Warnings:

  - You are about to drop the column `userId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_userId_key" ON "Store"("userId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
