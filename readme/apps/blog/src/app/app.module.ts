import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [PostModule, CommentModule],
  controllers: [],
  providers: [PostModule, CommentModule],
})
export class AppModule {}
