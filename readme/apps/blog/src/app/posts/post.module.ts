import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { getRMQConfig, RMQ_SERVICE } from '@readme/core';

import { CommentModule } from '../comment/comment.module';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RMQ_SERVICE,
        useFactory: getRMQConfig,
        inject: [ConfigService]
      }
    ]),
    forwardRef(() => CommentModule)
  ],
  controllers: [
    PostController
  ],
  providers: [
    PostService,
    PostRepository
  ],
  exports: [
    PostRepository
  ]
})
export class PostModule {}
