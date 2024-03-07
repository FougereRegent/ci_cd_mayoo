import { QuestionDTO, ResponsesDTO } from "@app/common";
import NumberOfGoodResponseException from "../../LogicExceptions/Quizz/NumberOfGoodResponseException";
import NumberOfResponseException from "../../LogicExceptions/Quizz/NumberOfResponseException";
import ResponseIsEmptyException from "../../LogicExceptions/Quizz/ResponseIsEmptyException";
import { CreateQuestionsDTO, CreateQuizzDTO, CreateResponseDTO } from "../quizz.dto";
import IComponent from "./IComponent";

export default class ResponseCheck implements IComponent {
  private static readonly numberOfResponse: number = 4;
  private static readonly numberOfGoodResponse: number = 4;
  next: IComponent;

  public async Execute(quizz: CreateQuizzDTO): Promise<void> {
    const questions: CreateQuestionsDTO[] | QuestionDTO[] = quizz.questions;

    questions.forEach((element) => {
      const responses: CreateResponseDTO[] = element.responses;
      if (!this.CheckResponseIsNotEmpty(responses))
        throw new ResponseIsEmptyException();
      if (!this.CheckNumerOfResponses(responses))
        throw new NumberOfResponseException(element.responses.length, ResponseCheck.numberOfResponse);
      if (!this.CheckNumberOfGoodResponse(responses))
        throw new NumberOfGoodResponseException();
    });

    if (this.next != null) {
      await this.next.Execute(quizz);
    }
  }

  private CheckResponseIsNotEmpty(responses: CreateResponseDTO[] | ResponsesDTO[]): boolean {
    for (let index: number = 0; index < responses.length; ++index) {
      const response: CreateResponseDTO = responses.at(index);

      if (response.response.trim() == "" || response.response == null) {
        return false;
      }
      if (response.good_response == null) {
        return false;
      }
    }
    return true;
  }

  private CheckNumerOfResponses(responses: CreateResponseDTO[] | ResponsesDTO[]): boolean {
    return responses.length == ResponseCheck.numberOfResponse;
  }

  private CheckNumberOfGoodResponse(question: CreateResponseDTO[] | ResponsesDTO[]): boolean {
    let true_number: number = 0;

    for (let index = 0; index < question.length; ++index) {
      if (question.at(index).good_response)
        true_number++;
    }
    return true_number <= ResponseCheck.numberOfGoodResponse;
  }
}
