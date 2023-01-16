import { Module } from '@nestjs/common';
import { EntityName, getRMQModuleConfig } from '@readme/core';
import { RMQModule } from 'nestjs-rmq';

import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [
    RMQModule.forRootAsync(getRMQModuleConfig(EntityName.Post)),
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
