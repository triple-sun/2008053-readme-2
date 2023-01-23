import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
import { ConfigService, registerAs } from "@nestjs/config";

import { join } from "path";
import { AppName } from "../enum/utils.enum";

export const mailerConfig = registerAs(AppName.Mailer, () => ({
  port: process.env.MAILER_PORT,
  host: process.env.MAILER_HOST,
  user: process.env.MAILER_USER,
  pass: process.env.MAILER_PASS,
  from: process.env.MAILER_FROM
}))

export const getMailerConfig = (): MailerAsyncOptions => ({
  useFactory: async (configService: ConfigService) => {
    return {
      transport: {
        host: configService.get<string>(`${AppName.Mailer}.host`),
        port: configService.get<number>(`${AppName.Mailer}.port`),
        secure: false,
        auth: {
          user: configService.get<string>(`${AppName.Mailer}.user`),
          pass: configService.get<string>(`${AppName.Mailer}.pass`)
        }
      },
      defaults: {
        from: `${configService.get<number>(`${AppName.Mailer}.from`)}`,
      },
      template: {
        dir: join(__dirname, './assets/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }},
    inject: [ConfigService]
  })
