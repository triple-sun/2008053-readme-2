import { Injectable } from '@nestjs/common';
import { CoreError, ErrorMessage } from '@readme/core';
import { MailService } from '../mail/mail.service';
import { NewPostsDTO } from './dto/new-posts.dto';
import { SubscriberCreateDTO } from './dto/subscriber-create.dto';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberRepository } from './subscriber.repository';


@Injectable()
export class SubscriberService {
  constructor(
    private readonly emailSubscriberRepository: SubscriberRepository,
    private readonly mailService: MailService
  ) {}

  public async exists(email: string) {
    return await this.emailSubscriberRepository.findByEmail(email);
  }

  public async addSubscriber(subscriber: SubscriberCreateDTO) {
    const existsSubscriber = await this.exists(subscriber.email);

    if (existsSubscriber) {
      throw new Error(CoreError.Subscriber);
    }

    this.mailService.sendNotifyNewSubscriber(subscriber);

    return this.emailSubscriberRepository
      .create(new SubscriberEntity(subscriber));
  }

  public async sendNewPosts(dto: NewPostsDTO) {
    const existsSubscriber = await this.exists(dto.email);

    if (!existsSubscriber) {
      throw new Error(
        ErrorMessage.SubNotFound(dto.email)
      )
    }

    return await this.mailService.sendNotifyNewPosts(dto)
  }
}
