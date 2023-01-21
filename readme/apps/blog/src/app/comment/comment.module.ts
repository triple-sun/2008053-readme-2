import { Module } from '@nestjs/common';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { PostModule } from '../posts/post.module';

@Module({
  imports: [
    PostModule
  ],
  controllers: [
    CommentController
  ],
  providers: [
    CommentService,
    CommentRepository
  ],
  exports: [
    CommentModule,
    CommentService
  ]
})
export class CommentModule {}
