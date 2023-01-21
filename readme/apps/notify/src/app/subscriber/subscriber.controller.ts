import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RPC } from '@readme/core';
import { SubscriberService } from './subscriber.service';
import { RMQRoute } from 'nestjs-rmq';
import { SubscriberCreateDTO } from './dto/subscriber-create.dto';
import { NotifyDTO } from '@readme/core';
import { SubscriberRepository } from './subscriber.repository';

@Controller()
export class SubscriberController {
  constructor(
    private readonly subscriberService: SubscriberService,
    private readonly subscriberRepository: SubscriberRepository,
  ) {}

  @RMQRoute(RPC.NewSub)
  public async create(subscriber: SubscriberCreateDTO) {
    return this.subscriberService.addSubscriber(subscriber);
  }

  @UseGuards(JwtAuthGuard)
  @RMQRoute(RPC.Notify)
  async notify(dto: NotifyDTO) {
    return this.subscriberService.notify(dto)
  }
}
