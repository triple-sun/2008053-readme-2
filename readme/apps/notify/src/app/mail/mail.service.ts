import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { MailConfig } from "@readme/core";
import { MailCreateDTO } from "./dto/mail-create.dto";

@Injectable()
export class MailService {
    constructor(
      private mailerService: MailerService
    ) {}

    async sendMail({email, name, posts}: MailCreateDTO) {
        const mail = await this.mailerService.sendMail({
            to: email,
            subject: MailConfig.Subject,
            template: MailConfig.Template,
            context: {
                name: name,
                posts: posts
            }
        })

        console.log(mail)
    }
}
