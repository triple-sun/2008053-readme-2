import { ConfigService, registerAs}  from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

export const rabbitMqConfig = registerAs('rmq', () => ({
  user: process.env.RMQ_USER,
  pass: process.env.RMQ_PASS,
  host: process.env.RMQ_HOST,
  queue: process.env.RMQ_QUEUE,
  exchange: process.env.RMQ_EXCHANGE,
}));

export function getRabbitMqConfig(configService: ConfigService): RmqOptions {
  const user = configService.get<string>('rmq.user');
  const password = configService.get<string>('rmq.pass');
  const host = configService.get<string>('rmq.host');
  const queue = configService.get<string>('rmq.queue');
  const url = `amqp://${user}:${password}@${host}`;

  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue,
      persistent: true,
      noAck: true,
      queueOptions: {
        durable: true,
      },
      prefetchCount: 1
    }
  }
}
