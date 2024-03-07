import { QuestionDTO, QuizzDTO } from "@app/common";
import EmptyQuestion from "../../LogicExceptions/Quizz/EmptyQuestion";
import { CreateQuestionsDTO, CreateQuizzDTO } from "../quizz.dto";
import IComponent from "./IComponent";

export default class QuestionCheck implements IComponent {
  next: IComponent;

  constructor() { }

  public async Execute(quizz: CreateQuizzDTO | QuizzDTO): Promise<void> {
    let questions: CreateQuestionsDTO[] | QuestionDTO[] = quizz.questions;

    for (let index: number = 0; index < questions.length; ++index) {
      if (this.CheckQuestionIsNotEmpty(questions.at(index))) {
        throw new EmptyQuestion();
      }
    }

    if (this.next != null) {
      await this.next.Execute(quizz);
    }
  }

  private CheckQuestionIsNotEmpty(questions: CreateQuestionsDTO | QuestionDTO): boolean {
    return questions.question.trim() == "" || questions.question == null
  }
}
