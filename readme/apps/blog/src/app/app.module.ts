import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validateEnvironments } from './env.validation';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './posts/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { ENV_FILE_PATH } from '@readme/core';
import envSchema from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      validationSchema: envSchema,
      validate: validateEnvironments,
    }),
  PrismaModule,
  PostModule,
  CommentModule
],
  controllers: [],
  providers: [PostModule, CommentModule],
})
export class AppModule {}
