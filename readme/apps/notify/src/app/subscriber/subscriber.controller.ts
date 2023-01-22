import { Controller } from '@nestjs/common';
import { ApiAuth, Entity, RPC, SubscriberCreateDTO, User, UserIDDTO } from '@readme/core';
import { SubscriberService } from './subscriber.service';
import { RMQRoute } from 'nestjs-rmq';

@Controller()
export class SubscriberController {
  constructor(
    private readonly subscriberService: SubscriberService,
  ) {}

  @RMQRoute(RPC.AddSub)
  public async create(user: SubscriberCreateDTO) {
    return this.subscriberService.addSubscriber(user);
  }

  @RMQRoute(RPC.Notify)
  @ApiAuth(Entity.Subscriber)
  async notify(
    @User() user: UserIDDTO
  ) {
    return this.subscriberService.notify(user)
  }
}
