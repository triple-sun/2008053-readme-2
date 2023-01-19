import { ConfigService, registerAs}  from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { AppName } from '../enum/app-name';

export const rmqConfig = registerAs(AppName.RMQ, () => ({
  user: process.env.RMQ_USER,
  pass: process.env.RMQ_PASS,
  host: process.env.RMQ_HOST,
  queue: process.env.RMQ_QUEUE,
}));

export function getRMQConfig(configService: ConfigService): RmqOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [
        {
          username: configService.get<string>(`${AppName.RMQ}.user`),
          password: configService.get<string>(`${AppName.RMQ}.pass`),
          hostname: configService.get<string>(`${AppName.RMQ}.host`)
        }
      ],
      queue: configService.get<string>(`${AppName.RMQ}.queue`),
      persistent: true,
      noAck: true,
      queueOptions: {
        durable: true,
      }
    }
  }
}
