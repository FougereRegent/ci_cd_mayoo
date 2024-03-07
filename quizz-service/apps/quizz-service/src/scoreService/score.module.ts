import { Logger, Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ScoreController } from "./score.controller";
import { ScoreService } from "./score.service";
import { ScoreEntity } from "./score.entity";

@Module({
  controllers: [ScoreController],
  providers: [ScoreService, PrismaService, ScoreEntity, Logger]
})
export class ScoreModule { }
