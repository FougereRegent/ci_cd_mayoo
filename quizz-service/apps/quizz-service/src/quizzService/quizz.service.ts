import { QuizzDTO } from "@app/common";
import { Injectable } from "@nestjs/common";
import { Quizz } from "@prisma/client";
import NotFoundQuizzException from "../LogicExceptions/Quizz/NotFoundQuizzException";
import { CreateQuizzDTO, SimpleQuizzDTO, quizzToQuizzDTO, quizzToSimpleQuizzDTO } from "./quizz.dto";
import QuizzEntity from "./quizz.entity";
import IComponent from "./quizzCheck/IComponent";
import { CreateBuilder, UpdateBuilder } from "./quizzCheck/RSBuilder";

@Injectable()
export default class QuizzService {
  private readonly __createComponent: IComponent;
  private readonly __updateComponent: IComponent;

  constructor(private readonly quizzEntity: QuizzEntity) {
    this.__createComponent = CreateBuilder(quizzEntity);
    this.__updateComponent = UpdateBuilder(quizzEntity);
  }

  public async createQuizz(createQuizzDTO: CreateQuizzDTO): Promise<void> {
    try {
      await this.__createComponent.Execute(createQuizzDTO);
    }
    catch (err: any) {
      throw err
    }
  }

  public async getQuizzById(id: number): Promise<QuizzDTO> {
    let quizz: Quizz | null = await this.quizzEntity.getQuizzById(id);
    let result: QuizzDTO;

    if (quizz == null) {
      throw new NotFoundQuizzException();
    }

    result = quizzToQuizzDTO(quizz);

    return result;
  }

  public async getAllQuizz(): Promise<SimpleQuizzDTO[] | null> {
    let entities: any[] | null = await this.quizzEntity.getAllQuizz();
    let result: Array<SimpleQuizzDTO> = new Array<SimpleQuizzDTO>()

    if (entities == null) {
      return null;
    }
    entities.forEach(element => result.push(quizzToSimpleQuizzDTO(element)))

    return result;
  }

  public async deleteQuizz(id: number): Promise<void> {
    let quizz: any | null = await this.quizzEntity.getQuizzById(id);

    if (quizz == null)
      throw new NotFoundQuizzException();

    await this.quizzEntity.deleteQuizz(quizz.id);
  }

  public async updateQuizz(quizz: QuizzDTO): Promise<void> {
    await this.__updateComponent.Execute(quizz);
  }
}
