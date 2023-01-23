import { Module } from '@nestjs/common';
import { JwtStrategy } from '@readme/core';
import { BffRpcModule } from '../bff-rpc/bff-rpc.module';
import { BffPostsController } from './bff-posts.controller';

@Module({
  imports: [
    BffRpcModule
  ],
  controllers: [
    BffPostsController
  ],
  providers: [
    JwtStrategy
  ],
  exports: [
    BffPostsModule,
  ]
})
export class BffPostsModule {}
