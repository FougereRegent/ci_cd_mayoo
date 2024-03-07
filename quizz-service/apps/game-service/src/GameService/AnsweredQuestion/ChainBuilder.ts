import { RedisService } from "../../redis.service";
import { IComponent } from "./IComponent";
import { GetGameComponent } from "./GetGameComponent";
import GetQuestionsComponent from "./GetQuestionsComponent";
import UpdateMetaDataAndMakeResponse from "./UpdateMetaDataAndMakeResponse";
import CheckResponsesAndQuestions from "./CheckResponseAndQuestions";
import CheckEndGame from "./CheckEndGame";
import SendResutlToQueue from "./SendResultToQueue";
import { ClientProxy } from "@nestjs/microservices";

export function buildChain(redisService: RedisService, rabbitClient: ClientProxy): IComponent {
  let getGameComponent: IComponent = new GetGameComponent(redisService);
  let updateMetaData: IComponent = new UpdateMetaDataAndMakeResponse(redisService);
  let checkResponseAndQuestion: IComponent = new CheckResponsesAndQuestions();
  let getQuestionsComponent: IComponent = new GetQuestionsComponent(redisService);
  let checkEndGame: IComponent = new CheckEndGame()
  let sendResultToQueue: IComponent = new SendResutlToQueue(redisService, rabbitClient);

  getGameComponent.next = checkEndGame;
  checkEndGame.next = getQuestionsComponent;
  getQuestionsComponent.next = checkResponseAndQuestion;
  checkResponseAndQuestion.next = updateMetaData
  updateMetaData.next = sendResultToQueue;

  return getGameComponent;
}
