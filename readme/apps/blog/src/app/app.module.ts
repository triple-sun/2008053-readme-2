import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { dbConfig, getMongoDbConfig, getSchema, validateEnvironment } from '@readme/core';
import { BLOG_DEFAULT_DB_PORT, BLOG_ENV_FILE_PATH } from './app.const';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './posts/post.module';

@Module({
  imports: [ConfigModule .forRoot({
    cache: true,
    isGlobal: true,
    envFilePath: BLOG_ENV_FILE_PATH,
    load: [dbConfig],
    validationSchema: getSchema(BLOG_DEFAULT_DB_PORT),
    validate: validateEnvironment
  }),
  MongooseModule.forRootAsync(
    getMongoDbConfig()
  ),
  PostModule,
  CommentModule
],
  controllers: [],
  providers: [PostModule, CommentModule],
})
export class AppModule {}
