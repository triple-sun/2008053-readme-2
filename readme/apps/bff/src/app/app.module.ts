import { Module } from '@nestjs/common';
import { AppName, getRMQModuleConfig } from '@readme/core';
import { RMQModule } from 'nestjs-rmq';
import { BffCommentsController } from './bff-comments/bff-comments.controller';
import { BffCommentsService } from './bff-comments/bff-comments.service';
import { BffPostsController } from './bff-posts/bff-posts.controller';
import { BffPostsService } from './bff-posts/bff-posts.service';
import { BffUsersController } from './bff-users/bff-users.controller';


@Module({
  imports: [
    RMQModule.forRootAsync(getRMQModuleConfig(AppName.BFF))
  ],
  controllers: [BffUsersController, BffPostsController, BffCommentsController],
  providers: [BffCommentsService, BffPostsService, BffUsersController],
})
export class AppModule {}
