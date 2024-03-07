import { QuizzDTO } from "@app/common";
import BadNumberOfQuestions from "../../LogicExceptions/Quizz/BadNumberOfQuestions";
import BadQuizzName from "../../LogicExceptions/Quizz/BadQuizzName";
import { QuizDateException } from "../../LogicExceptions/Quizz/QuizDateException";
import { CreateQuestionsDTO, CreateQuizzDTO } from "../quizz.dto";
import IComponent from "./IComponent";

export default class QuizzCheck implements IComponent {
  private static readonly NB_QUESTION: number = 12;
  private static readonly REGEX: string = "^[\\w\\s']{1,64}$";

  next: IComponent;

  public async Execute(quizz: CreateQuizzDTO | QuizzDTO): Promise<void> {

    if (!this.CheckNbQuestionIsEqual(quizz.questions)) {
      throw new BadNumberOfQuestions(quizz.questions.length, QuizzCheck.NB_QUESTION);
    }

    if (!this.CheckQuizzNameIsValid(quizz.name)) {
      throw new BadQuizzName(quizz.name);
    }

    if (!this.CheckQuizDate(quizz)) {
      throw new QuizDateException();
    }

    if (this.next != null) {
      await this.next.Execute(quizz);
    }
  }

  private CheckNbQuestionIsEqual(questions: CreateQuestionsDTO[]): boolean {
    return questions.length == QuizzCheck.NB_QUESTION;
  }

  private CheckQuizzNameIsValid(name: string): boolean {
    const regex = new RegExp(QuizzCheck.REGEX);
    return regex.test(name);
  }

  private CheckQuizDate(quizz: CreateQuizzDTO): boolean {
    let start_date: Date = quizz.start_date;
    let end_date: Date = quizz.end_date;

    if (start_date <= end_date)
      return true;

    return false;
  }
}
