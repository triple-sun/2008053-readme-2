import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { SubscriberCreateDTO } from './dto/subscriber-create.dto';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberRepository } from './subscriber.repository';
import { NotifyDTO } from '@readme/core';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly subscriberRepository: SubscriberRepository,
    private readonly mailService: MailService,
  ) {}

  public async addSubscriber(subscriber: SubscriberCreateDTO) {
    const sub = await this.subscriberRepository.create(new SubscriberEntity(subscriber));

    await this.mailService.sendNotifyNewSubscriber(subscriber);

    return sub
  }

  public async notify(dto: NotifyDTO) {
    const subscriber = await this.subscriberRepository.findByUserID(dto.userID);

    return await this.mailService.sendNotifyNewPosts(subscriber, dto.posts)
  }
}
