import { ConfigService, registerAs}  from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

import { EnvRegisterAs } from '../enum/env.enum';
import { getAMQPConnectionString } from '../utils/utils';

export const rmqOptions = registerAs(EnvRegisterAs.RabbitMQ, () => ({
  user: process.env.RMQ_USER,
  pass: process.env.RMQ_PASS,
  host: process.env.RMQ_HOST,
  queue: process.env.RMQ_QUEUE,
}));

export const getRMQConfig = (configService: ConfigService): RmqOptions => ({
    transport: Transport.RMQ,
    options: {
      urls: [
        getAMQPConnectionString({
          user: configService.get<string>(`${EnvRegisterAs.RabbitMQ}.user`),
          pass: configService.get<string>(`${EnvRegisterAs.RabbitMQ}.pass`),
          host: configService.get<string>(`${EnvRegisterAs.RabbitMQ}.host`)
        })
      ],
      queue: configService.get<string>(`${EnvRegisterAs.RabbitMQ}.queue`),
      persistent: true,
      noAck: true,
      queueOptions: {
        durable: true,
      }
    }
})
