import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMailerConfig, getMongoDbConfig } from '@readme/core';
import { notifyConfigModuleConfig } from '../config/config.module.config';
import { MailModule } from './mail/mail.module';
import { SubscriberModule } from './subscriber/subscriber.module';

@Module({
  imports: [
    ConfigModule.forRoot(notifyConfigModuleConfig),
    MailerModule.forRootAsync(getMailerConfig()),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    MailModule,
    SubscriberModule
  ],
})
export class AppModule {}
