/*
  Warnings:

  - You are about to drop the `TaskSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskSkills" DROP CONSTRAINT "TaskSkills_skillId_fkey";

-- DropForeignKey
ALTER TABLE "TaskSkills" DROP CONSTRAINT "TaskSkills_taskId_fkey";

-- DropTable
DROP TABLE "TaskSkills";

-- CreateTable
CREATE TABLE "TaskSkill" (
    "taskId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "TaskSkill_pkey" PRIMARY KEY ("taskId","skillId")
);

-- AddForeignKey
ALTER TABLE "TaskSkill" ADD CONSTRAINT "TaskSkill_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskSkill" ADD CONSTRAINT "TaskSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
