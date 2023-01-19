import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Entity, getRMQModuleConfig, jwtModuleConfig } from '@readme/core';
import { RMQModule } from 'nestjs-rmq';
import { MailModule } from '../mail/mail.module';
import { SubscriberController } from './subscriber.controller';
import { SubscriberModel, SubscriberSchema } from './subscriber.model';
import { SubscriberRepository } from './subscriber.repository';
import { SubscriberService } from './subscriber.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SubscriberModel.name, schema: SubscriberSchema }]),
    JwtModule.registerAsync(jwtModuleConfig),
    RMQModule.forRootAsync(getRMQModuleConfig(Entity.Subscriber)),
    MailModule
  ],
  controllers: [
    SubscriberController
  ],
  providers: [
    SubscriberService,
    SubscriberRepository
  ],
})
export class SubscriberModule {}
