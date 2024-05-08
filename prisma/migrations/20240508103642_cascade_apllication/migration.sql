-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_taskId_fkey";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'available';

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
