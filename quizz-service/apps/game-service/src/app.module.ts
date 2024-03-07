import { Module } from "@nestjs/common";
import GameModule from "./GameService/game.module";

@Module({
  imports: [GameModule]
})
export class AppModule {
}
