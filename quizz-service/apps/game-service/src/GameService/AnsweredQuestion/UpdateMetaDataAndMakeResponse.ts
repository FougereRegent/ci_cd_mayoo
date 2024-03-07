import { RedisService } from "../../redis.service";
import { IComponent } from "./IComponent";
import { AnserwedQuestionDTO, GameMetaData, StateResponseDTO } from "../game.dto";
import { ResponsesDTO } from "@app/common";
import { RedisClientType } from "redis";
import { redis_expire_time } from "@app/common";

export default class UpdateMetaDataAndMakeResponse implements IComponent {
  private readonly redisService: RedisService;
  public next: IComponent;

  constructor(redisService: RedisService) {
    this.redisService = redisService;
  }

  public async Execute(response?: AnserwedQuestionDTO, game?: GameMetaData, responses?: ResponsesDTO[]): Promise<StateResponseDTO> {
    let client: RedisClientType = await this.redisService.connect();

    let state: boolean = false;
    let id_good_response: Array<number> = responses.filter(predicate => predicate.good_response == true).map(el => el.id);

    response.id_response.forEach(element => {
      let id: number = id_good_response.findIndex(el => el == element);
      if (id >= 0)
        state = true;
      else
        state = false;
    });

    if (response.id_response.length != id_good_response.length) {
      state = false;
    }

    if (game.answered_question < 12) {
      await this.UpdateGameData(client, response.guid, state);
      await this.AddReponse(client, response);
    }

    let end_game: boolean = await this.ItsEndGame(client, response.guid);

    let result: StateResponseDTO = {
      state: state,
      id_good_response: id_good_response,
      end_game: end_game
    };

    if (this.next != null && end_game) {
      this.next.Execute(response, game, responses);
    }

    return result;
  }

  private async UpdateGameData(client: RedisClientType, guid: string, good_response: boolean) {
    let key: string = `game:${guid}`;
    await client.hIncrBy(key, "answered_question", 1);
    //TODO : Modifier id de prochaine questions
    await client.hIncrBy(key, "next_question_index", 1);
    if (good_response)
      await client.hIncrBy(key, "nb_good_response", 1);
  }

  private async AddReponse(client: RedisClientType, response: AnserwedQuestionDTO) {
    let key: string = `responses:${response.guid}`;
    let responses: string = "";
    response.id_response.forEach(element => responses += `${element.toString()};`);
    responses = responses.substring(0, responses.length - 1);
    await client.RPUSH(key, response.id_response.toString());
    await client.expire(key, redis_expire_time);
  }

  private async ItsEndGame(client: RedisClientType, guid: string): Promise<boolean> {
    let key: string = `game:${guid}`;
    try {
      var response: number = Number(await client.HGET(key, "answered_question"));
    } catch (err: any) {
      throw err;
    }
    return response == 12;
  }
}
