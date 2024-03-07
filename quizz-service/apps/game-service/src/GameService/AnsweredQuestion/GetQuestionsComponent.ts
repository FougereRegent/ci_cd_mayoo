import { RedisService } from "../../redis.service";
import { IComponent } from "./IComponent";
import { AnserwedQuestionDTO, GameMetaData, StateResponseDTO } from "../game.dto"
import { QuestionDTO, ResponsesDTO } from "@app/common";
import { RedisClientType } from "redis";

export default class GetQuestionsComponent implements IComponent {
  private readonly redisService: RedisService;
  public next: IComponent;

  constructor(redisService: RedisService) {
    this.redisService = redisService;
  }

  public async Execute(response?: AnserwedQuestionDTO, game?: GameMetaData, responses?: ResponsesDTO[]): Promise<StateResponseDTO> {
    let client: RedisClientType = await this.redisService.connect();
    let key: string = `quizz:${game.quizz_id}`;


    try {
      var redis_actual_question: any = await client.json.get(key, { path: `$.questions[${game.next_question_index}]` });
    } catch (err: any) {
      throw err;
    }

    let actual_questions: QuestionDTO = redis_actual_question[0];
    let resp: ResponsesDTO[] = actual_questions.responses;

    if (this.next != null) {
      return this.next.Execute(response, game, resp);
    }
    return null;
  }
}
