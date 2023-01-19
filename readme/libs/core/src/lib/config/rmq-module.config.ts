import { ConfigModule, ConfigService, registerAs } from "@nestjs/config";
import { IRMQServiceAsyncOptions } from 'nestjs-rmq'
import { AppName } from "../enum/app-name";

export const rmqModuleConfig = registerAs(AppName.RMQ, () => ({
  user: process.env.RMQ_USER,
  pass: process.env.RMQ_PASS,
  host: process.env.RMQ_HOST,
  queue: process.env.RMQ_QUEUE,
  exchange: process.env.RMQ_EXCHANGE,
}))

export const getRMQModuleConfig = (serviceName: string): IRMQServiceAsyncOptions => ({
  imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (configService: ConfigService) => {
				return {
					exchangeName: configService.get<string>(`${AppName.RMQ}.exchange`),
					connections: [
						{
							login: configService.get<string>(`${AppName.RMQ}.user`),
							password: configService.get<string>(`${AppName.RMQ}.pass`),
							host: configService.get<string>(`${AppName.RMQ}.host`),
						},
					],
					queueName: configService.get<string>(`${AppName.RMQ}.queue`),
          serviceName
				};
			},
})
