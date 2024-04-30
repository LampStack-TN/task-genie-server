/*
  Warnings:

  - You are about to drop the column `clientId` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_clientId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "clientId",
ADD COLUMN     "professionalId" INTEGER;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
