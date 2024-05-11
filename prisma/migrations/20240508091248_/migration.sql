/*
  Warnings:

  - Added the required column `cinRecto` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cinVerso` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officalDocument` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "cinRecto" TEXT NOT NULL,
ADD COLUMN     "cinVerso" TEXT NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "officalDocument" TEXT NOT NULL;
