/*
  Warnings:

  - You are about to drop the column `questionType` on the `Questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "questionType";

-- DropEnum
DROP TYPE "EnumQuestionType";
