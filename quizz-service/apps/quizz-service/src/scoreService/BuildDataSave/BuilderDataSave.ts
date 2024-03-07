import { QueueResultResponse } from "@app/common";
import { IBuilderDataSave } from "./IBuilderDataSave";
import { Prisma } from "@prisma/client";

export class BuidlerDataSave implements IBuilderDataSave {
  private __instance_score: Prisma.UserScoreCreateArgs;
  private __instance_questions: Array<Prisma.UserQuestionCreateWithoutUserScoreInput>;
  private __instance_user: Prisma.UserCreateNestedOneWithoutScoresInput;
  private __instance_quizz: Prisma.QuizzCreateNestedOneWithoutUserScoreInput;

  public get Instance() {
    this.__instance_score = {
      data: {
        user: this.__instance_user,
        quizz: this.__instance_quizz,
        questions: {
          create: this.__instance_questions
        }
      }
    };
    return this.__instance_score;
  }

  public constructor() {
    this.__instance_questions = Array<Prisma.UserQuestionCreateWithoutUserScoreInput>();
  }

  public AddName(name: string): IBuilderDataSave {
    this.__instance_user = {
      connectOrCreate: {
        create: {
          name: name
        },
        where: {
          name: name
        },
      }
    }
    return this;
  }

  public AddQuizz(quizz_id: number): IBuilderDataSave {
    this.__instance_quizz = {
      connect: {
        id: quizz_id
      }
    };

    return this;
  }

  public AddQuestionAndResult(question: QueueResultResponse): IBuilderDataSave {
    this.__instance_questions.push({
      question: {
        connect: {
          id: question.question_id
        }
      },
      responses: {
        create: this.CreateResponsesUser(question.responses)
      }
    });
    return this;
  }

  private CreateResponsesUser(responses: Array<number>): Prisma.UserResponseCreateWithoutUserQuestionInput[] {
    let result: Array<Prisma.UserResponseCreateWithoutUserQuestionInput> =
      new Array<Prisma.UserResponseCreateWithoutUserQuestionInput>();

    responses.forEach(element => {
      result.push({
        response: {
          connect: {
            id: element
          }
        }
      });
    });

    return result;
  }
}
