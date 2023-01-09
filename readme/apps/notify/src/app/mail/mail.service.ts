import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailConfig } from '@readme/core';
import { NewPostsDTO } from '../subscriber/dto/new-posts.dto';
import { ISubscriber } from '@readme/shared-types';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewPosts({email, name, postIDs}: NewPostsDTO) {
    await this.mailerService.sendMail({
      to: email,
      subject: MailConfig.NewPostsSubject,
      template: MailConfig.NewPostsTemplate,
      context: { name, postIDs }
    })
  }

    public async sendNotifyNewSubscriber({email, name}: ISubscriber) {
    await this.mailerService.sendMail({
      to: email,
      subject: MailConfig.NewSubSubject,
      template: MailConfig.NewSubTemplate,
      context: {
        user: `${name}`,
        email: `${email}`,
      }
    })
  }
}
