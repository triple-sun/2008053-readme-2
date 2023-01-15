import { ConfigService, registerAs } from "@nestjs/config"
import { AsyncModuleConfig } from '@golevelup/nestjs-modules'

import { EnvRegisterAs } from "../enum/env.enum"
import { getAMQPConnectionString } from "../utils/env.utils"
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq'

export const rmqModuleOptions = registerAs(EnvRegisterAs.RabbitMQModule, () => ({
  user: process.env.RMQ_USER,
  pass: process.env.RMQ_PASS,
  host: process.env.RMQ_HOST,
  queue: process.env.RMQ_QUEUE,
  exchange: process.env.RMQ_EXCHANGE,
  topic: process.env.RMQ_EXCHANGE_TYPE
}))

export const getRabbitMQModuleConfig = (): AsyncModuleConfig<RabbitMQConfig> => ({
  useFactory: (configService: ConfigService) => {
    return {
      exchanges: [{
        name: configService.get<string>(`${EnvRegisterAs.RabbitMQModule}.exchange`),
        type: configService.get<string>(`${EnvRegisterAs.RabbitMQModule}.topic`)
      }],
        uri: `${getAMQPConnectionString({
          user: configService.get<string>(`${EnvRegisterAs.RabbitMQModule}.user`),
          pass: configService.get<string>(`${EnvRegisterAs.RabbitMQModule}.pass`),
          host: configService.get<string>(`${EnvRegisterAs.RabbitMQModule}.host`)
        })}:5672`,
      prefetchCount: 1,
      enableControllerDiscovery: true,
      enableDirectReplyTo: true
    }},
  inject: [ConfigService]
})
