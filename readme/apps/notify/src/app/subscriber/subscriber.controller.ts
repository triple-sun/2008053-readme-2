import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { CommandEvent, CommandMessage, UpdatePostsDTO, UserSubscribeDTO } from '@readme/core';
import { SubscriberService } from './subscriber.service';
import { SubscriberCreateDTO } from './dto/subscriber-create.dto';
import { SubscriberNotifyDTO } from './dto/subscriber-notify.dto';

@Controller()
export class SubscriberController {
  constructor(
    private readonly subscriberService: SubscriberService,
  ) {}

  @EventPattern({ cmd: CommandEvent.AddSubscriber})
  public async create(subscriber: SubscriberCreateDTO) {
    return this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern({ cmd: CommandEvent.UpdatePosts})
  public async updatePosts(dto: UpdatePostsDTO) {
    return this.subscriberService.updatePosts(dto)
  }

  @EventPattern({ cmd: CommandEvent.UserSubscribe})
  public async subscribe(dto: UserSubscribeDTO) {
    return this.subscriberService.updateSubscriptions(dto)
  }

  @EventPattern({ cmd: CommandEvent.NewPosts})
  public async notify(dto: SubscriberNotifyDTO) {
    return this.subscriberService.notify(dto)
  }

  @MessagePattern({ cmd: CommandMessage.GetSub })
  async getSub(@Payload() userID: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();

    const sub = await this.subscriberService.getSubscriber({userID})

    return channel.ack(sub)
  }

}
