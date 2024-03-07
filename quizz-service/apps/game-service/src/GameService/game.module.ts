import { Logger, Module } from '@nestjs/common'
import GameService from './game.service';
import GameController from './game.controller';
import { RedisService } from '../redis.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [HttpModule,
    ClientsModule.register([{
      name: "RABBIT_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.RABBITMQ_QUEUE,
        queueOptions: {
          durable: true
        }
      }
    }])],
  providers: [GameService, RedisService, Logger],
  controllers: [GameController]
})
export default class GameModule { }
