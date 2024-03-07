import { RedisService } from "../../redis.service";
import { IComponent } from "./IComponent";
import { AnserwedQuestionDTO, GameMetaData, StateResponseDTO } from "../game.dto";
import { ResponsesDTO } from "@app/common";
import { RedisClientType } from "redis";
import { GameNotFoundException } from "../../CustomException/Game/GameNotFound";

export class GetGameComponent implements IComponent {
  private redisService: RedisService;
  public next: IComponent;

  constructor(redisService: RedisService) {
    this.redisService = redisService;
  }

  public async Execute(response?: AnserwedQuestionDTO, game?: GameMetaData, responses?: ResponsesDTO[]): Promise<StateResponseDTO | null> {
    let client: RedisClientType = await this.redisService.connect();
    let key_game: string = `game:${response.guid}`;

    try {
      if (await client.exists(key_game) == 0)
        throw new GameNotFoundException(response.guid);

      var redis_game: any = await client.hGetAll(key_game);
      game = {
        quizz_id: Number(redis_game["quizz_id"]),
        name: String(redis_game["name"]),
        nb_good_response: Number(redis_game["nb_good_response"]),
        answered_question: Number(redis_game["answered_question"]),
        next_question_index: Number(redis_game["next_question_index"])
      };
    }
    catch (err: any) {
      throw err;
    }


    if (this.next != null) {
      return this.next.Execute(response, game, responses);
    }

    return null;

  }
}
