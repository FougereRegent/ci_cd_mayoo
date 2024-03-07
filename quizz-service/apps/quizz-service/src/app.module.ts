import { Module } from '@nestjs/common';
import { QuizzModule } from './quizzService/quizz.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScoreModule } from './scoreService/score.module';

@Module({
  imports: [QuizzModule, ScoreModule,
    ClientsModule.register([
      {
        name: "QUIZZ_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.RABBITMQ_QUEUE,
          queueOptions: {
            durable: false
          }
        }
      }
    ])],
})
export class AppModule { }
