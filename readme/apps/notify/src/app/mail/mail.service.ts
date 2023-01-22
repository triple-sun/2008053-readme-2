import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailConfig } from '@readme/core';
import { ISub } from '@readme/shared-types';
import { Post } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewPosts(subscriber: ISub, posts: Post[]) {
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
