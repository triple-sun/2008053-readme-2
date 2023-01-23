import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailConfig, NotifyDTO } from '@readme/core';
import { ISub } from '@readme/shared-types';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewPosts({sub, posts}: NotifyDTO) {
    await this.mailerService.sendMail({
      to: sub.email,
      subject: MailConfig.NewPostsSubject,
      template: MailConfig.NewPostsTemplate,
      context: {
        name: sub.name,
        posts: posts
      }
    })
  }

  public async sendNotifyNewSubscriber({email, name}: ISub) {
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
