import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './posts/post.module';
import { PrivateRouteMiddleware } from '@readme/core';
import { BlogPrivateRoutes } from './app.const';

@Module({
  imports: [PostModule, CommentModule],
  controllers: [],
  providers: [PostModule, CommentModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PrivateRouteMiddleware)
      .forRoutes(...BlogPrivateRoutes);
  }
}
