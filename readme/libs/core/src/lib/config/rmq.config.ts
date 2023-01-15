import { ConfigService, registerAs}  from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { Service } from '../const/service.const';

import { EnvRegisterAs } from '../enum/env.enum';

export const rmqOptions = registerAs(EnvRegisterAs.RMQ, () => ({
  user: process.env.RMQ_USER,
  pass: process.env.RMQ_PASS,
  host: process.env.RMQ_HOST,
  queue: process.env.RMQ_QUEUE,
}));

export const getRMQConfig = (configService: ConfigService): RmqOptions => {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [{
          username: configService.get<string>(`${EnvRegisterAs.RMQ}.user`),
          password: configService.get<string>(`${EnvRegisterAs.RMQ}.pass`),
          hostname: configService.get<string>(`${EnvRegisterAs.RMQ}.host`),
      }],
      queue: configService.get<string>(`${EnvRegisterAs.RMQ}.queue`),
      queueOptions: { durable: true },
      persistent: true,
      noAck: true,
    }
  }
}

export const rmqClientConfig = [{
  name: Service.RMQService,
  useFactory: getRMQConfig,
  inject: [ConfigService]
}]

