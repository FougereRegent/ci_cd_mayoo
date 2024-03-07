import { QuizzDTO } from "@app/common";
import { CreateQuizzDTO } from "../quizz.dto";
import QuizzEntity from "../quizz.entity";
import IComponent from "./IComponent";

export default class UpdateQuizz implements IComponent {
  next: IComponent;
  private readonly __quizzEntity: QuizzEntity;

  constructor(quizzEntity: QuizzEntity) {
    this.__quizzEntity = quizzEntity;
  }

  public async Execute(quizz: CreateQuizzDTO | QuizzDTO): Promise<void> {
    await this.__quizzEntity.updateQuizz(quizz as QuizzDTO);

    if (this.next != null) {
      this.next.Execute(quizz);
    }
  }
}
