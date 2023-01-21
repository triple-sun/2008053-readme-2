import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { blogConfig } from '../../config/blog.config';
import { CommentController } from './comment/comment.controller';

import { CommentModule } from './comment/comment.module';
import { PostController } from './posts/post.controller';
import { PostModule } from './posts/post.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(blogConfig),
    PrismaModule,
    PostModule,
    CommentModule,
  ],
  controllers: [
    PostController,
    CommentController
  ],
  providers: [
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}
