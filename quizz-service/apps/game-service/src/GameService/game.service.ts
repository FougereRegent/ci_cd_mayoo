import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { RedisClientType } from "redis";
import { RedisService } from "../redis.service";
import { v4 as uuidv4 } from "uuid"
import { AnserwedQuestionDTO, GameMetaData, GameQuestionDTO, GameResponseDTO, QuizzResult, ResponseStartGameDTO, ResponsesDTOtoGameResponseDTO, StateResponseDTO } from "./game.dto";
import { ResponsesDTO, QuizzDTO, QuestionDTO } from "@app/common";
import { GameNotFoundException } from "../CustomException/Game/GameNotFound";
import { QuestionNotFoundException } from "../CustomException/Game/QuestionNotFound";
import { QuizzNotFoundException } from "../CustomException/Game/QuizzNotFound"
import { IComponent } from "./AnsweredQuestion/IComponent";
import { buildChain } from "./AnsweredQuestion/ChainBuilder";
import { ClientProxy } from "@nestjs/microservices";
import { redis_expire_time, redis_expire_time_quizz } from "@app/common";


@Injectable()
export default class GameService {
  private static quizz_url: string = process.env.QUIZZ_HOST;
  @Inject("RABBIT_SERVICE")
  private readonly client: ClientProxy;

  constructor(private readonly redisService: RedisService, private readonly httpService: HttpService) {
  }

  public async fetchQuizzIntoQuizzService(quizz_id: number, name: string): Promise<ResponseStartGameDTO> {
    let client: RedisClientType = await this.redisService.connect();
    try {
      var name_quizz: string = `quizz:${quizz_id}`;
      if (await client.exists(name_quizz) == 1) {
        var guid: string = await this.generateGuidAndInitializeMetaData(quizz_id, name);
        return {
          guid: guid
        }
      }
      var response: AxiosResponse<any> = await this.httpService.axiosRef.get(`${GameService.quizz_url}/quizz/${quizz_id}`);
      var data: any = response.data;

      await client.json.set(name_quizz, "$", data);
      await client.expire(name_quizz, redis_expire_time_quizz);

      var guid: string = await this.generateGuidAndInitializeMetaData(quizz_id, name);
    }
    catch (err: any) {
      if (response.status == 404)
        throw new QuizzNotFoundException(quizz_id);
      throw err;
    }
    return {
      guid: guid
    };
  }

  public async getNextQuestion(guid: string): Promise<GameQuestionDTO> {
    let client: RedisClientType = await this.redisService.connect();
    let res: GameQuestionDTO;
    try {
      var result_next_question_id: any = await client.hGetAll(`game:${guid}`);
    }
    catch (err: any) {
      console.error(err);
      throw err;
    }
    let metaData: GameMetaData = result_next_question_id

    if (metaData.quizz_id == undefined &&
      metaData.next_question_index == undefined &&
      metaData.answered_question == undefined) {
      throw new GameNotFoundException(guid);
    }

    try {
      var result: any = await client.json.get(`quizz:${metaData.quizz_id}`, { path: `$.questions[${metaData.next_question_index}]` });

    } catch (err: any) {
      throw err;
    }

    if (result == null) {
      throw new QuestionNotFoundException(metaData.quizz_id);
    }

    let question: QuestionDTO = result[0];
    let responses: GameResponseDTO[] = new Array<GameResponseDTO>();

    question.responses.forEach(element => responses.push(ResponsesDTOtoGameResponseDTO(element)));

    res = {
      question: question.question,
      response: responses
    }

    return res;
  }

  public async answeredQuestion(response: AnserwedQuestionDTO): Promise<StateResponseDTO> {
    let answeredQuestion: IComponent = buildChain(this.redisService, this.client);
    try {
      return await answeredQuestion.Execute(response, null, null);
    }
    catch (err: any) {
      throw err;
    }
  }

  public async getResult(guid: string): Promise<QuizzResult> {
    let client: RedisClientType = await this.redisService.connect();
    let key: string = `game:${guid}`;
    try {
      let exist: number = await client.exists(key);
      if (exist == 0)
        throw new GameNotFoundException(guid);
      let nb_good_response: string = await client.hGet(key, "nb_good_response");
      let nb_response: string = await client.hGet(key, "answered_question");
      return {
        nb_good_response: Number(nb_good_response),
        nb_response: Number(nb_response)
      };
    } catch (err: any) {
      throw err;
    }
  }

  private async generateGuidAndInitializeMetaData(quizz_id: number, name: string): Promise<string> {
    let client: RedisClientType = await this.redisService.connect();
    let guid: string = uuidv4()
    let key_name: string = `game:${guid}`;

    try {
      let metaData: GameMetaData = {
        name: name,
        quizz_id: quizz_id,
        answered_question: 0,
        next_question_index: 0,
        nb_good_response: 0
      };

      await client.hSet(key_name, metaData);
      await client.expire(key_name, redis_expire_time);
    }
    catch (err: any) {
      console.log(err);
      throw err;
    }
    return guid;
  }
}
