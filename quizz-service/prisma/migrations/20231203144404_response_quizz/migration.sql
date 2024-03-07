/*
  Warnings:

  - Added the required column `good_response` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "good_response" BOOLEAN NOT NULL,
ADD COLUMN     "questionsId" INTEGER;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
