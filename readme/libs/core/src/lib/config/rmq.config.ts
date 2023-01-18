import { ConfigService, registerAs}  from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { Token } from '../enum/token.enum';

export const rmqConfig = registerAs(Token.RMQ, () => ({
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
          username: configService.get<string>(`${Token.RMQ}.user`),
          password: configService.get<string>(`${Token.RMQ}.pass`),
          hostname: configService.get<string>(`${Token.RMQ}.host`)
        }
      ],
      queue: configService.get<string>(`${Token.RMQ}.queue`),
      persistent: true,
      noAck: true,
      queueOptions: {
        durable: true,
      }
    }
  }
}
