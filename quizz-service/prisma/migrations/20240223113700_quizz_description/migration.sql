/*
  Warnings:

  - You are about to drop the column `mealName` on the `Quizz` table. All the data in the column will be lost.
  - Added the required column `description` to the `Quizz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `Quizz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Quizz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quizz" DROP COLUMN "mealName",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;
