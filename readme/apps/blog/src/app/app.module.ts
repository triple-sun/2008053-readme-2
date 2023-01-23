import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { blogConfig } from '../../config/blog.config';

import { CommentModule } from './comment/comment.module';
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
  ],
  providers: [
  ],
})
export class AppModule {}
