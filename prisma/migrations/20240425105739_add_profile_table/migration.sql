-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
