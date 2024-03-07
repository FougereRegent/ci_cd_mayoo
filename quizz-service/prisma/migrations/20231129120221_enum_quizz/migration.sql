/*
  Warnings:

  - Added the required column `questionType` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealName` to the `Quizz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnumQuestionType" AS ENUM ('HEALTH', 'COUNTRY', 'SEASONALITY', 'PRODUCTONG_COUNTRY');

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "questionType" "EnumQuestionType" NOT NULL;

-- AlterTable
ALTER TABLE "Quizz" ADD COLUMN     "mealName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idUser" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "QuizzUserScore" (
    "id" SERIAL NOT NULL,
    "quizzId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "QuizzUserScore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuizzUserScore" ADD CONSTRAINT "QuizzUserScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizzUserScore" ADD CONSTRAINT "QuizzUserScore_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
