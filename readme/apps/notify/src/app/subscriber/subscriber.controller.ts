import { EventPattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { CommandEvent } from '@readme/core';
import { SubscriberService } from './subscriber.service';
import { SubscriberCreateDTO } from './dto/subscriber-create.dto';
import { NewPostsDTO } from './dto/new-posts.dto';

@Controller()
export class SubscriberController {
  constructor(
    private readonly subscriberService: SubscriberService,
  ) {}

  @EventPattern({ cmd: CommandEvent.AddSubscriber})
  public async create(subscriber: SubscriberCreateDTO) {
    return this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern({ cmd: CommandEvent.NewPosts})
  public async sendUpdates(dto: NewPostsDTO) {
    return this.subscriberService.sendNewPosts(dto)
  }
}
