import { ConfigModule, ConfigService, registerAs } from "@nestjs/config"

import { EnvRegisterAs } from "../enum/env.enum"

import { AsyncModuleConfig } from '@golevelup/nestjs-modules'
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq'

export const rabbitMQModuleOptions = registerAs(EnvRegisterAs.RMQ, () => ({
  user: process.env.RMQ_USER,
  pass: process.env.RMQ_PASS,
  host: process.env.RMQ_HOST,
  queue: process.env.RMQ_QUEUE,
  exchange: process.env.RMQ_EXCHANGE,
  uri: process.env.RMQ_URI
}))

export const getRabbitMQModuleConfig = (): AsyncModuleConfig<RabbitMQConfig> => ({
  useFactory: async (configService: ConfigService) => {
    return {
      exchanges: [{
        name: 'rabbitmq',
        type: 'topic'
      }],
      uri: configService.get<string>(`${EnvRegisterAs.RMQ}.uri`),
      prefetchCount: 1,
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
      enableDirectReplyTo: true
    }},
  imports: [ConfigModule],
  inject: [ConfigService],
  })
