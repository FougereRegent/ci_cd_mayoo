import ResponseNotFound from "../../CustomException/Game/ResponseNotFound";
import { AnserwedQuestionDTO, GameMetaData, StateResponseDTO } from "../game.dto";
import { ResponsesDTO } from "@app/common";
import { IComponent } from "./IComponent";

type ResultIndex = {
  id_exist: boolean
  missed_id?: number
};

export default class CheckResponsesAndQuestions implements IComponent {
  public next: IComponent;

  public Execute(response?: AnserwedQuestionDTO, game?: GameMetaData, responses?: ResponsesDTO[]): Promise<StateResponseDTO> {
    let id_responses_questions: number[] = responses.map(element => element.id);
    let index_exist: ResultIndex = this.IndexAreGood(response.id_response, id_responses_questions);

    if (!index_exist.id_exist) {
      throw new ResponseNotFound(index_exist.missed_id);
    }

    if (this.next != null) {
      return this.next.Execute(response, game, responses);
    }
    return null;
  }

  private IndexAreGood(id_response_sended: Array<number>, id_responses_questions: Array<number>): ResultIndex {
    for (let index = 0; index < id_response_sended.length; ++index) {
      let resp: number = id_response_sended.at(index);
      let id: number = id_responses_questions.findIndex(element => element == resp);

      if (id == -1) {
        return {
          id_exist: false,
          missed_id: resp
        };
      }
    }
    return {
      id_exist: true,
      missed_id: null
    };
  }
}
