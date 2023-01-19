import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailConfig, TPostRDO } from '@readme/core';
import { ISubscriber } from '@readme/shared-types';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewPosts(subscriber: ISubscriber, posts: TPostRDO[]) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: MailConfig.NewPostsSubject,
      template: MailConfig.NewPostsTemplate,
      context: {
        name: subscriber.name,
        posts: posts
      }
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
