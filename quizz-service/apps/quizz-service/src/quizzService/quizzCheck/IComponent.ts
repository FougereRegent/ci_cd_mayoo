import { QuizzDTO } from "@app/common";
import { CreateQuizzDTO } from "../quizz.dto";

export default interface IComponent {
  next: IComponent;
  Execute(quizz: CreateQuizzDTO | QuizzDTO): Promise<void>;
}

