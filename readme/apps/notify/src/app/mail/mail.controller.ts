import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Prefix } from "@readme/core";
import { MailCreateDTO } from "./dto/mail-create.dto";
import { MailService } from "./mail.service";

@ApiTags(Prefix.Mail)
@Controller(Prefix.Mail)
export class MailController {
    constructor(
      private readonly mailService: MailService
    ) {}

    @Post()
    async sendEmail(
      @Body() dto: MailCreateDTO,
    ) {
        return await this.mailService.sendMail(dto);
    }
}
