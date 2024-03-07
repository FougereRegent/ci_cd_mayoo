import { Logger, Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { QuizzController } from "./quizz.controller";
import QuizzEntity from "./quizz.entity";
import QuizzService from "./quizz.service";

@Module({
  controllers: [QuizzController],
  providers: [QuizzService, PrismaService, QuizzEntity, Logger]
})
export class QuizzModule {
}
