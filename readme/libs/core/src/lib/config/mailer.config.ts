import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
import { ConfigService, registerAs } from "@nestjs/config";

import { join } from "path";
import { Token } from "../enum/token.enum";

export const mailerConfig = registerAs(Token.Mailer, () => ({
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
        host: configService.get<string>(`${Token.Mailer}.host`),
        port: configService.get<number>(`${Token.Mailer}.port`),
        secure: false,
        auth: {
          user: configService.get<string>(`${Token.Mailer}.user`),
          pass: configService.get<string>(`${Token.Mailer}.pass`)
        }
      },
      defaults: {
        from: `${configService.get<number>(`${Token.Mailer}.from`)}`,
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
