import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { blogConfig } from '../../config/blog.config';

import { CommentModule } from './comment/comment.module';
import { PostController } from './posts/post.controller';
import { PostModule } from './posts/post.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    PostModule,
    CommentModule,
    ConfigModule.forRoot(blogConfig),
  ],
  controllers: [
    PostController
  ],
  providers: [
    PostModule,
    CommentModule
  ],
  exports: []
})
export class AppModule {}
