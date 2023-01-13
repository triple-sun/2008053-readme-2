import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
import { ConfigService, registerAs } from "@nestjs/config";
import { getMailerTransportString } from "../utils/utils";

import { join } from "path";
import { EnvRegisterAs } from "../enum/env.enum";

export const mailerOptions = registerAs(EnvRegisterAs.Mailer, () => ({
  port: process.env.MAILER_PORT,
  host: process.env.MAILER_HOST,
  user: process.env.MAILER_USER,
  pass: process.env.MAILER_PASS,
  from: process.env.MAILER_FROM
}))

export const getMailerConfig = (): MailerAsyncOptions => {
  return {
  useFactory: async (configService: ConfigService) =>{
    console.log(getMailerTransportString({
      user: configService.get<string>(`${EnvRegisterAs.Mailer}.user`),
      pass: configService.get<string>(`${EnvRegisterAs.Mailer}.pass`),
      host: configService.get<string>(`${EnvRegisterAs.Mailer}.host`),
      port: configService.get<number>(`${EnvRegisterAs.Mailer}.port`),
    }))
    return {
      transport: {
        host: configService.get<string>(`${EnvRegisterAs.Mailer}.host`),
        port: configService.get<number>(`${EnvRegisterAs.Mailer}.port`),
        secure: false,
        auth: {
          user: configService.get<string>(`${EnvRegisterAs.Mailer}.user`),
          pass: configService.get<string>(`${EnvRegisterAs.Mailer}.pass`)
        }
      },
      defaults: {
        from: `${configService.get<number>(`${EnvRegisterAs.Mailer}.from`)}`,
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
  }
}
