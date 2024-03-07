import QuizzEntity from "../quizz.entity";
import AddQuizz from "./AddQuizz";
import ExistQuizzComponent from "./ExistQuizz";
import IComponent from "./IComponent";
import QuestionCheck from "./QuestionsCheck";
import QuizzCheck from "./QuizzCheck";
import ResponseCheck from "./ResponseCheck";
import UpdateQuizz from "./UpdateQuizz";

export function CreateBuilder(quizzEntity: QuizzEntity): IComponent {
  let addQuizz: IComponent = new AddQuizz(quizzEntity);
  let existQuizz: IComponent = new ExistQuizzComponent(quizzEntity);
  let questionsCheck: IComponent = new QuestionCheck();
  let responseCheck: IComponent = new ResponseCheck();
  let quizzCheck: IComponent = new QuizzCheck();

  existQuizz.next = quizzCheck;
  quizzCheck.next = questionsCheck;
  questionsCheck.next = responseCheck;
  responseCheck.next = addQuizz;

  return existQuizz;
};

export function UpdateBuilder(quizzEntity: QuizzEntity): IComponent {
  let questionsCheck: IComponent = new QuestionCheck();
  let responseCheck: IComponent = new ResponseCheck();
  let quizzCheck: IComponent = new QuizzCheck();
  let updateQuizz: IComponent = new UpdateQuizz(quizzEntity);

  quizzCheck.next = questionsCheck;
  questionsCheck.next = responseCheck;
  responseCheck.next = updateQuizz;

  return quizzCheck;

}
