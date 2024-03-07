/*
  Warnings:

  - The values [PRODUCTONG_COUNTRY] on the enum `EnumQuestionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EnumQuestionType_new" AS ENUM ('HEALTH', 'COUNTRY', 'SEASONALITY', 'PRODUCTING_COUNTRY');
ALTER TABLE "Questions" ALTER COLUMN "questionType" TYPE "EnumQuestionType_new" USING ("questionType"::text::"EnumQuestionType_new");
ALTER TYPE "EnumQuestionType" RENAME TO "EnumQuestionType_old";
ALTER TYPE "EnumQuestionType_new" RENAME TO "EnumQuestionType";
DROP TYPE "EnumQuestionType_old";
COMMIT;
