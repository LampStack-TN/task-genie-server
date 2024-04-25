/*
  Warnings:

  - You are about to drop the `TaskSkill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskSkill" DROP CONSTRAINT "TaskSkill_skillId_fkey";

-- DropForeignKey
ALTER TABLE "TaskSkill" DROP CONSTRAINT "TaskSkill_taskId_fkey";

-- DropTable
DROP TABLE "TaskSkill";

-- CreateTable
CREATE TABLE "_TaskSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskSkill_AB_unique" ON "_TaskSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskSkill_B_index" ON "_TaskSkill"("B");

-- AddForeignKey
ALTER TABLE "_TaskSkill" ADD CONSTRAINT "_TaskSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskSkill" ADD CONSTRAINT "_TaskSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
