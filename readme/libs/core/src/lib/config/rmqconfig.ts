import { ConfigModule, ConfigService, registerAs } from "@nestjs/config";
import { EnvRegisterAs } from "../enum/env.enum";

export const rmqModuleOptions = registerAs(EnvRegisterAs.RabbitMQModule, () => ({
  user: process.env.RMQ_USER,
  pass: process.env.RMQ_PASS,
  host: process.env.RMQ_HOST,
  queue: process.env.RMQ_QUEUE,
  exchange: process.env.RMQ_EXCHANGE,
  topic: process.env.RMQ_EXCHANGE_TYPE
}))

export const getRMQModuleConfig = {
  imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: (configService: ConfigService) => {
				return {
					exchangeName: 'test',
					connections: [
						{
							login: 'guest',
							password: 'guest',
							host: 'localhost',
						},
					],
					queueName: 'test',
				};
			},
}
