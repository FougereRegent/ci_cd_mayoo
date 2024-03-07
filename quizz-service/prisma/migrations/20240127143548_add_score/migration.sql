/*
  Warnings:

  - You are about to drop the `QuizzUserScore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuizzUserScore" DROP CONSTRAINT "QuizzUserScore_quizzId_fkey";

-- DropForeignKey
ALTER TABLE "QuizzUserScore" DROP CONSTRAINT "QuizzUserScore_userId_fkey";

-- DropTable
DROP TABLE "QuizzUserScore";

-- CreateTable
CREATE TABLE "UserScore" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "quizzId" INTEGER NOT NULL,

    CONSTRAINT "UserScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserQuestion" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questionsId" INTEGER NOT NULL,
    "userScoreId" INTEGER,

    CONSTRAINT "UserQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserResponse" (
    "id" SERIAL NOT NULL,
    "responseId" INTEGER NOT NULL,
    "userQuestionId" INTEGER,

    CONSTRAINT "UserResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserScore" ADD CONSTRAINT "UserScore_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserScore" ADD CONSTRAINT "UserScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestion" ADD CONSTRAINT "UserQuestion_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestion" ADD CONSTRAINT "UserQuestion_userScoreId_fkey" FOREIGN KEY ("userScoreId") REFERENCES "UserScore"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResponse" ADD CONSTRAINT "UserResponse_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResponse" ADD CONSTRAINT "UserResponse_userQuestionId_fkey" FOREIGN KEY ("userQuestionId") REFERENCES "UserQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
