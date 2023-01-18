import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMailerConfig, getMongoConfig } from '@readme/core';
import { notifyConfig } from '../../config/notify.config';
import { MailModule } from './mail/mail.module';
import { SubscriberModule } from './subscriber/subscriber.module';

@Module({
  imports: [
    ConfigModule.forRoot(notifyConfig),
    MailerModule.forRootAsync(getMailerConfig()),
    MongooseModule.forRootAsync(getMongoConfig()),
    MailModule,
    SubscriberModule
  ],
})
export class AppModule {}
