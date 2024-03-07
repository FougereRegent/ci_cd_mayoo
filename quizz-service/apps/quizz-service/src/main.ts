import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exit } from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'info',
      format: winston.format.json(),
      handleExceptions: true,
      transports: [
        new winston.transports.File({ filename: `${process.env.LOG_PATH}/error.log`, level: "error" }),
        new winston.transports.File({ filename: `${process.env.LOG_PATH}/combined.log` }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike("Quizz-Service", {
              colors: true,
              prettyPrint: true
            })
          )
        })
      ]
    })
  });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.RABBITMQ_QUEUE,
      queueOption: {
        durable: false
      }
    }
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV == "DEV") {
    console.log("=== DEV Environement ===");

    const config = new DocumentBuilder()
      .setTitle("Quizz")
      .setDescription("API pour la gestions des quizz")
      .setVersion("0.1")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
  }
  else if (process.env.NODE_ENV == "PROD") {
    console.log("=== PROD Environement ===");
  }
  else {
    console.error(`ERROR : Bad node env : ${process.env.NODE_ENV}`);
    exit();
  }
  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
}

bootstrap();
