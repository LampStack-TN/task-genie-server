-- CreateTable
CREATE TABLE "Skills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskSkills" (
    "taskId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "TaskSkills_pkey" PRIMARY KEY ("taskId","skillId")
);

-- AddForeignKey
ALTER TABLE "TaskSkills" ADD CONSTRAINT "TaskSkills_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskSkills" ADD CONSTRAINT "TaskSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
