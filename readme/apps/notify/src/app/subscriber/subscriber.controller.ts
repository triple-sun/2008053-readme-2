import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, NotifyDTO, RPC, UserRDO } from '@readme/core';
import { SubscriberService } from './subscriber.service';
import { RMQRoute } from 'nestjs-rmq';
import { SubscriberRepository } from './subscriber.repository';

@Controller()
export class SubscriberController {
  constructor(
    private readonly subscriberService: SubscriberService,
    private readonly subscriberRepository: SubscriberRepository,
  ) {}

  @RMQRoute(RPC.NewSub)
  public async create(user: UserRDO) {
    return this.subscriberService.addSubscriber(user);
  }

  @UseGuards(JwtAuthGuard)
  @RMQRoute(RPC.Notify)
  async notify(dto: NotifyDTO) {
    return this.subscriberService.notify(dto)
  }
}
