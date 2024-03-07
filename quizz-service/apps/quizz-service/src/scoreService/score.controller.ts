import { QueueResultQuizz, queue_pattern } from "@app/common";
import { Controller, Inject, Logger } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { ScoreService } from "./score.service";


@Controller("score/")
export class ScoreController {
  @Inject()
  private __score_service: ScoreService;
  @Inject()
  private __logger: Logger;

  @MessagePattern(queue_pattern)
  public async getNotificationQueue(@Payload() data: string, @Ctx() context: RmqContext) {
    let val: QueueResultQuizz = JSON.parse(data);
    this.__logger.log("Received a message from the queue")
    try {
      await this.__score_service.SaveResonseToDb(val);
    }
    catch (err: any) {
      this.__logger.error(err.message, null, "ScoreController : getNotificationQueue");
    }
  }
}
