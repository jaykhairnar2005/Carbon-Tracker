-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'default',
    "value" DOUBLE PRECISION NOT NULL,
    "carbonEmission" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);
