import { Inject, Injectable } from "@nestjs/common";
import { ScoreEntity } from "./score.entity";
import { QueueResultQuizz } from "@app/common";
import { IBuilderDataSave } from "./BuildDataSave/IBuilderDataSave";
import { BuidlerDataSave } from "./BuildDataSave/BuilderDataSave";

@Injectable()
export class ScoreService {
  @Inject()
  private readonly __scoreEntity: ScoreEntity;

  public constructor() {

  }

  public async SaveResonseToDb(data_save: QueueResultQuizz): Promise<void> {
    let builder: IBuilderDataSave = new BuidlerDataSave();
    builder.AddQuizz(data_save.quizz_id);
    builder.AddName(data_save.name);

    data_save.responses.forEach(element => builder.AddQuestionAndResult(element));
    try {
      await this.__scoreEntity.saveData(builder.Instance);
    }
    catch (err: any) {
      console.error(err);
    }
  }
}
