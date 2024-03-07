import { AnserwedQuestionDTO, GameMetaData, StateResponseDTO } from "../game.dto";
import { ResponsesDTO } from "@app/common";
import { IComponent } from "./IComponent";
import EndGameException from "../../CustomException/Game/EndGameException";

export default class CheckEndGame implements IComponent {
  public next: IComponent;

  public async Execute(response?: AnserwedQuestionDTO, game?: GameMetaData, responses?: ResponsesDTO[]): Promise<StateResponseDTO> {
    if (game.answered_question >= 12) {
      throw new EndGameException();
    }

    if (this.next != null) {
      return this.next.Execute(response, game, responses);
    }
    return null
  }
}
