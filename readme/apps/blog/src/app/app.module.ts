import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './posts/post.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
  PrismaModule,
  PostModule,
  CommentModule
],
  controllers: [],
  providers: [PostModule, CommentModule],
})
export class AppModule {}
