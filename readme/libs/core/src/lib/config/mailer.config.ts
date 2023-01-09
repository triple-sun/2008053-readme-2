import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
import { ConfigService, registerAs } from "@nestjs/config";

import { join } from "path";
import { EnvRegisterAs } from "../enum/env.enum";
import { getMailerTransportString } from "../utils/utils";

export const mailerOptions = registerAs(EnvRegisterAs.Mailer, () => ({
  port: parseInt(process.env.MAILER_PORT, 10),
  host: process.env.MAILER_HOST,
  user: process.env.MAILER_USER,
  pass: process.env.MAILER_PASS,
  from: process.env.MAILER_FROM
}))

export const getMailerConfig = (): MailerAsyncOptions => {
  return {
    useFactory: async (configService: ConfigService) => ({
      transport: getMailerTransportString({
        user: configService.get<string>(`${EnvRegisterAs.Mailer}.user`),
        port: configService.get<number>(`${EnvRegisterAs.Mailer}.port`),
        pass: configService.get<string>(`${EnvRegisterAs.Mailer}.pass`),
        host: configService.get<string>(`${EnvRegisterAs.Mailer}.host`),
      }),
      defaults: {
        from: `"No Reply" <${configService.get<number>(`${EnvRegisterAs.Mailer}.from`)}>`,
      },
      template: {
        dir: join(__dirname, './assets/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
    inject: [ConfigService]
  }
}
