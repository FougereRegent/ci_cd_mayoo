import { Injectable } from "@nestjs/common";
import { RedisClientType } from "@redis/client";
import { createClient } from "redis";

@Injectable()
export class RedisService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
      }
    });
  }

  public async connect(): Promise<any> {
    if (!this.client.isOpen)
      await this.client.connect();

    return this.client;
  }
}
