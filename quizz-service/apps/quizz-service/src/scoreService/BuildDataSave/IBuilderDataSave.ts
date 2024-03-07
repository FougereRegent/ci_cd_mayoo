import { QueueResultResponse } from "@app/common";
import { Prisma } from "@prisma/client";

export interface IBuilderDataSave {
  Instance: Prisma.UserScoreCreateArgs;
  AddName(name: string): IBuilderDataSave;
  AddQuizz(quizz_id: number): IBuilderDataSave;
  AddQuestionAndResult(question: QueueResultResponse): IBuilderDataSave;
}
