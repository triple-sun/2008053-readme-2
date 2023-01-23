import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { bffConfig } from '../../config/bff.config';
import { BffCommentsModule } from './bff-comments/bff-comments.module';
import { BffPostsModule } from './bff-posts/bff-posts.module';
import { BffUsersModule } from './bff-users/bff-users.module';

@Module({
  imports: [
    ConfigModule.forRoot(bffConfig),
    BffPostsModule,
    BffUsersModule,
    BffCommentsModule
  ]
})
export class AppModule {}
