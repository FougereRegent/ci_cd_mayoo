import { AnserwedQuestionDTO, GameMetaData, StateResponseDTO } from "../game.dto";
import { QuestionDTO, ResponsesDTO } from "@app/common";
import { IComponent } from "./IComponent";
import { RedisService } from "../../redis.service";
import { ClientProxy } from "@nestjs/microservices";
import { RedisClientType } from "redis";
import { QueueResultResponse, QueueResultQuizz, queue_pattern } from "@app/common";

export default class SendResutlToQueue implements IComponent {
  private readonly redisService: RedisService;
  private readonly rabbitClient: ClientProxy;
  public next: IComponent;

  public constructor(redisService: RedisService, rabbitClient: ClientProxy) {
    this.rabbitClient = rabbitClient;
    this.redisService = redisService;
  }

  public async Execute(response?: AnserwedQuestionDTO, game?: GameMetaData, responses?: ResponsesDTO[]): Promise<StateResponseDTO> {
    let resp: Array<string> = await this.RetrieveResponses(response.guid);
    let ids: Array<number> = await this.RetrieveQuestionsId(game.quizz_id);
    let result_resp: Array<QueueResultResponse> = new Array<QueueResultResponse>();
    let index: number = 0;

    ids.forEach(id => {
      result_resp.push({
        question_id: id,
        responses: resp[index++].split(",").map(element => parseInt(element))
      });
    });
    let result: QueueResultQuizz = {
      quizz_id: game.quizz_id,
      name: game.name,
      responses: result_resp
    };

    let data: string = JSON.stringify(result);
    await this.rabbitClient.send(queue_pattern, data).toPromise();
    return null;
  }

  private async RetrieveResponses(guid: string): Promise<Array<string>> {
    let redis_client: RedisClientType = await this.redisService.connect();
    let key: string = `responses:${guid}`;
    try {
      var result: any = await redis_client.lRange(key, 0, -1);
    }
    catch (err: any) {
    }
    return result;
  }

  private async RetrieveQuestionsId(id: number): Promise<Array<number>> {
    let redis_client: RedisClientType = await this.redisService.connect();
    let key: string = `quizz:${id}`;

    try {
      var redis_actual_question: any = await redis_client.json.get(key, { path: `$.questions` });
    } catch (err: any) {
      throw err;
    }

    let questions: Array<QuestionDTO> = redis_actual_question[0];
    let ids: Array<number> = questions.map(element => element.id);
    return ids;
  }
}
