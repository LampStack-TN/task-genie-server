/*
  Warnings:

  - The values [Critical,Urgent,Priority,Soon,Anytime] on the enum `Urgency` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Urgency_new" AS ENUM ('high', 'low', 'medium');
ALTER TABLE "Task" ALTER COLUMN "urgency" TYPE "Urgency_new" USING ("urgency"::text::"Urgency_new");
ALTER TYPE "Urgency" RENAME TO "Urgency_old";
ALTER TYPE "Urgency_new" RENAME TO "Urgency";
DROP TYPE "Urgency_old";
COMMIT;
