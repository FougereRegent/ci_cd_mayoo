import { QuestionDTO, QuizzDTO, ResponsesDTO } from "@app/common";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { CreateQuestionsDTO, CreateQuizzDTO, CreateResponseDTO } from "./quizz.dto";

@Injectable()
export default class QuizzEntity {
  constructor(private readonly prismaService: PrismaService) { }

  public getAllQuizz(): Promise<any[] | null> {
    return this.prismaService.quizz.findMany();
  }

  public getQuizzByName(name: string): Promise<any | null> {
    return this.prismaService.quizz.findUnique({
      where: {
        quizzName: name
      },
      include: {
        questions: {
          include: {
            responses: true
          }
        }
      }
    });
  }

  public getQuizzById(id: number): Promise<any | null> {
    return this.prismaService.quizz.findUnique({
      where: {
        id: id
      },
      include: {
        questions: {
          include: {
            responses: true
          }
        }
      }
    });
  }

  public async getQuizzExist(id: number): Promise<boolean> {
    let result: any | null = await this.prismaService.quizz.findUnique({
      where: {
        id: id
      }
    });

    if (result == null)
      return false;

    return true;
  }

  public createQuizz(quizz: CreateQuizzDTO): Promise<any> {
    let questions: Prisma.QuestionsCreateInput[] = new Array<Prisma.QuestionsCreateInput>();
    let result: Prisma.QuizzCreateInput;

    quizz.questions.forEach(element => questions.push(this.createQuestions(element)));
    result = {
      quizzName: quizz.name,
      description: quizz.description,
      start_date: new Date(quizz.start_date),
      end_date: new Date(quizz.end_date),
      questions: {
        create: questions
      }
    };

    return this.prismaService.quizz.create({
      data: result
    });
  }

  public deleteQuizz(id_quizz: number): Promise<any> {
    return this.prismaService.quizz.delete({
      where: {
        id: id_quizz
      },
      include: {
        questions: {
          include: {
            responses: true
          }
        }
      }
    })
  }

  public updateQuizz(quizz: QuizzDTO): Promise<any> {
    let questions: Prisma.QuestionsUpdateArgs[] = new Array<Prisma.QuestionsUpdateArgs>();

    quizz.questions.forEach(element => questions.push(this.updateQuestions(element)));

    return this.prismaService.quizz.update({
      where: {
        id: quizz.id
      },
      data: {
        quizzName: quizz.name,
        description: quizz.description,
        start_date: quizz.start_date,
        end_date: quizz.end_date,
        questions: {
          update: questions
        }
      }
    })
  }


  private createQuestions(question: CreateQuestionsDTO): Prisma.QuestionsCreateInput {
    let result: Prisma.QuestionsCreateInput;
    let responses: Prisma.ResponseCreateInput[] = new Array<Prisma.ResponseCreateInput>();

    question.responses.forEach(element => responses.push(this.createResponses(element)));

    result = {
      questions: question.question,
      responses: {
        create: responses
      }
    }

    return result;
  }

  private createResponses(response: CreateResponseDTO): Prisma.ResponseCreateInput {
    let result: Prisma.ResponseCreateInput = {
      response: response.response,
      good_response: response.good_response
    }
    return result;
  }

  private updateQuestions(question: QuestionDTO): Prisma.QuestionsUpdateArgs {
    let result: Prisma.QuestionsUpdateArgs;
    let responses: Prisma.ResponseUpdateArgs[] = new Array<Prisma.ResponseUpdateArgs>();

    question.responses.forEach(element => responses.push(this.updateResponses(element)));

    result = {
      where: {
        id: question.id
      },
      data: {
        questions: question.question,
        responses: {
          update: responses
        }
      }
    };

    return result;
  }

  private updateResponses(response: ResponsesDTO): Prisma.ResponseUpdateArgs {
    let result: Prisma.ResponseUpdateArgs = {
      where: {
        id: response.id
      },
      data: {
        response: response.response,
        good_response: response.good_response
      }
    };
    return result;
  }
}
