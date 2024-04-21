-- CreateEnum
CREATE TYPE "Role" AS ENUM ('client', 'professional', 'admin');

-- CreateEnum
CREATE TYPE "Urgency" AS ENUM ('Critical', 'Urgent', 'Priority', 'Soon', 'Anytime');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "fullname" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipcode" BIGINT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "minPrice" TEXT NOT NULL,
    "maxPrice" TEXT NOT NULL,
    "dueDate" TEXT NOT NULL,
    "urgency" "Urgency" NOT NULL,
    "clientId" BIGINT NOT NULL,
    "expertiseId" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
