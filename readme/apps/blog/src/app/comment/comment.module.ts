import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentMemoryRepository } from './comment-memory.repository';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentMemoryRepository],
  exports: [CommentService]
})
export class CommentModule {}
