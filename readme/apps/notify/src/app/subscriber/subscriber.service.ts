import { Injectable } from '@nestjs/common';
import { NotifyDTO, UserRDO } from '@readme/core';
import { MailService } from '../mail/mail.service';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberRepository } from './subscriber.repository';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly subscriberRepository: SubscriberRepository,
    private readonly mailService: MailService,
  ) {}

  public async addSubscriber({email, name, id: userID}: UserRDO) {
    const sub = await this.subscriberRepository.create(new SubscriberEntity({email, name, userID}));

    await this.mailService.sendNotifyNewSubscriber(sub);

    return sub
  }

  public async notify(dto: NotifyDTO) {
    const subscriber = await this.subscriberRepository.findByEmail(dto.email);

    return await this.mailService.sendNotifyNewPosts(subscriber, dto.posts)
  }
}
