import { AnserwedQuestionDTO, GameMetaData, StateResponseDTO } from "../game.dto"
import { ResponsesDTO } from "@app/common"

export interface IComponent {
  next: IComponent
  Execute(response?: AnserwedQuestionDTO, game?: GameMetaData, responses?: ResponsesDTO[]): Promise<StateResponseDTO | null>
}
