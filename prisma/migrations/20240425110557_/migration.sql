/*
  Warnings:

  - You are about to drop the `Skills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskSkills" DROP CONSTRAINT "TaskSkills_skillId_fkey";

-- DropTable
DROP TABLE "Skills";

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskSkills" ADD CONSTRAINT "TaskSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
