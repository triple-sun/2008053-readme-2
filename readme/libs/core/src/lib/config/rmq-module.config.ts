import { ConfigModule, ConfigService, registerAs } from "@nestjs/config";
import { EnvRegisterAs } from "../enum/env.enum";
import { IRMQServiceAsyncOptions } from 'nestjs-rmq'

export const rmqModuleOptions = registerAs('rmq', () => ({
  user: process.env.RMQ_USER,
  pass: process.env.RMQ_PASS,
  host: process.env.RMQ_HOST,
  queue: process.env.RMQ_QUEUE,
  exchange: process.env.RMQ_EXCHANGE,
  topic: process.env.RMQ_EXCHANGE_TYPE
}))

export const getRMQModuleConfig = (): IRMQServiceAsyncOptions => ({
  imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (configService: ConfigService) => {
				return {
					exchangeName: configService.get<string>(`${EnvRegisterAs.RMQ}.exchange`),
					connections: [
						{
							login: configService.get<string>(`${EnvRegisterAs.RMQ}.user`),
							password: configService.get<string>(`${EnvRegisterAs.RMQ}.pass`),
							host: configService.get<string>(`${EnvRegisterAs.RMQ}.host`),
						},
					],
					queueName: configService.get<string>(`${EnvRegisterAs.RMQ}.queue`),
				};
			},
})
