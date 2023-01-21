import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Property, getRMQModuleConfig, jwtModuleConfig, JwtStrategy} from '@readme/core';
import { RMQModule } from 'nestjs-rmq';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [
    PassportModule,
    RMQModule.forRootAsync(getRMQModuleConfig(Property.Post)),
    JwtModule.registerAsync(jwtModuleConfig),
  ],
  controllers: [
    PostController,
  ],
  providers: [
    PostService,
    PostRepository,
    JwtStrategy
  ],
  exports: [
    PostRepository,
    PostService
  ]
})
export class PostModule {}
