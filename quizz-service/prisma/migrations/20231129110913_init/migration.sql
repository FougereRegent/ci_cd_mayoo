-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quizz" (
    "id" SERIAL NOT NULL,
    "quizzName" TEXT NOT NULL,

    CONSTRAINT "Quizz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "questions" TEXT NOT NULL,
    "quizzId" INTEGER,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" SERIAL NOT NULL,
    "response" TEXT NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quizz_quizzName_key" ON "Quizz"("quizzName");

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz"("id") ON DELETE SET NULL ON UPDATE CASCADE;
