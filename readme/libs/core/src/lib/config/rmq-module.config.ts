import { ConfigModule, ConfigService, registerAs } from "@nestjs/config";
import { IRMQServiceAsyncOptions } from 'nestjs-rmq'
import { Token } from "../enum/token.enum";

export const rmqModuleConfig = registerAs(Token.RMQ, () => ({
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
					exchangeName: configService.get<string>(`${Token.RMQ}.exchange`),
					connections: [
						{
							login: configService.get<string>(`${Token.RMQ}.user`),
							password: configService.get<string>(`${Token.RMQ}.pass`),
							host: configService.get<string>(`${Token.RMQ}.host`),
						},
					],
					queueName: configService.get<string>(`${Token.RMQ}.queue`),
          serviceName
				};
			},
})
