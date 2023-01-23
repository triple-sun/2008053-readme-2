import { Module } from '@nestjs/common';
import { BffPostsController } from './bff-posts.controller';
import { BffPostsService } from './bff-posts.service';

@Module({
  imports: [  ],
  controllers: [BffPostsController],
  providers: [BffPostsService],
})
export class BffPostsModule {}
