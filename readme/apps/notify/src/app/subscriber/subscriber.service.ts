import { Injectable } from '@nestjs/common';
import { ExistsErrorMessage, NotFoundErrorMessage, UpdatePostsDTO, UserDTO, UserSubscribeDTO } from '@readme/core';
import { MailService } from '../mail/mail.service';
import { SubscriberCreateDTO } from './dto/subscriber-create.dto';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberRepository } from './subscriber.repository';
import { SubscriberNotifyDTO } from './dto/subscriber-notify.dto';
import { PartialType, PickType } from '@nestjs/swagger';

class ExistsSubscriber extends PartialType(
  PickType(UserDTO, ['email', 'userID'] as const)
) {}

@Injectable()
export class SubscriberService {
  constructor(
    private readonly subscriberRepository: SubscriberRepository,
    private readonly mailService: MailService
  ) {}

  public async getSubscriber({email, userID}: ExistsSubscriber) {
    const subscriber = email
      ? await this.subscriberRepository.findByEmail(email)
      : await this.subscriberRepository.findByUserID(userID)

    if (!subscriber) {
      throw new Error(
        email
          ? NotFoundErrorMessage.SubNotFoundEmail(email)
          : NotFoundErrorMessage.SubNotFoundUserID(userID)
      )
    }

    return subscriber
  }

  public async addSubscriber(subscriber: SubscriberCreateDTO) {
    const exists = await this.getSubscriber({email: subscriber.email})

    if (exists) {
      throw new Error(
        ExistsErrorMessage.SubExistsEmail(subscriber.email)
      )
    }

    await this.mailService.sendNotifyNewSubscriber(subscriber);

    return this.subscriberRepository.create(new SubscriberEntity(subscriber));
  }

  public async updatePosts(dto: UpdatePostsDTO) {
    await this.getSubscriber({userID: dto.userID});

    return this.subscriberRepository.updatePosts(dto);
  }

  public async updateSubscriptions(query: UserSubscribeDTO) {
    await this.getSubscriber({userID: query.userID});
    await this.getSubscriber({userID: query.subToID})

    return this.subscriberRepository.subscribe(query);
  }

  public async notify({userID}: SubscriberNotifyDTO) {
    const subscriber = await this.getSubscriber({userID});

    const notification = await this.mailService.sendNotifyNewPosts(subscriber)

    const updatedEntity = new SubscriberEntity({...subscriber, notifiedAt: new Date(), posts: []})

    await this.subscriberRepository.update(subscriber.id, updatedEntity)

    return notification;
  }

}
