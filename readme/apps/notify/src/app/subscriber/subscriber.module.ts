import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { SubscriberController } from './subscriber.controller';
import { SubscriberModel, SubscriberSchema } from './subscriber.model';
import { SubscriberRepository } from './subscriber.repository';
import { SubscriberService } from './subscriber.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriberModel.name, schema: SubscriberSchema }
    ]),
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
