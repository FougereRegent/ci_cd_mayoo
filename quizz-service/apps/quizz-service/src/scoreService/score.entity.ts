import { Inject, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class ScoreEntity {
  @Inject()
  private readonly __prismaService: PrismaService;

  public saveData(data: Prisma.UserScoreCreateArgs): Promise<any | null> {
    return this.__prismaService.userScore.create(data);
  }
}
