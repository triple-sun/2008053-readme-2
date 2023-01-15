import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { getRabbitMQModuleConfig } from '@readme/core';

import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQModuleConfig()),
  ],
  controllers: [
    PostController
  ],
  providers: [
    PostService,
    PostRepository
  ],
  exports: [
    PostRepository,
    PostService,
  ]
})
export class PostModule {}
