import { QuizzDTO } from "@app/common";
import { CreateQuizzDTO } from "../quizz.dto";
import QuizzEntity from "../quizz.entity";
import IComponent from "./IComponent";

export default class AddQuizz implements IComponent {
  next: IComponent;
  private readonly __quizzEntity: QuizzEntity;

  constructor(quizzEntity: QuizzEntity) {
    this.__quizzEntity = quizzEntity;
  }

  public async Execute(quizz: CreateQuizzDTO | QuizzDTO): Promise<any> {

    await this.__quizzEntity.createQuizz(quizz);

    if (this.next != null) {
      this.next.Execute(quizz);
    }
  }
}
