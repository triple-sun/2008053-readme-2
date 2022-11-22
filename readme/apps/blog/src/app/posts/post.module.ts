import { Module } from '@nestjs/common';
import { CommentModule } from '../comment/comment.module';
import { PostMemoryRepository } from './post-memory.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [CommentModule],
  controllers: [PostController],
  providers: [PostService, PostMemoryRepository],
})
export class PostModule {}
