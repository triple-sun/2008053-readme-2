import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { NotifyDTO, RPC, SubscriberCreateDTO, UserIDDTO } from '@readme/core';
import { ObjectId } from 'mongoose';
import { MailService } from '../mail/mail.service';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberRepository } from './subscriber.repository';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly subscriberRepository: SubscriberRepository,
    private readonly mailService: MailService,
  ) {}

  public async addSubscriber({email, name, userId}: SubscriberCreateDTO) {
    const sub = await this.subscriberRepository.create(new SubscriberEntity({email, name, userId}));

    await this.mailService.sendNotifyNewSubscriber(sub);

    return sub
  }

  public async notify(dto: NotifyDTO) {
    return await this.mailService.sendNotifyNewPosts(dto)
  }
}
