/*
  Warnings:

  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.
  - You are about to alter the column `clientId` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "userId",
ALTER COLUMN "clientId" DROP NOT NULL,
ALTER COLUMN "clientId" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "zipcode" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
