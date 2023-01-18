import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EntityName, getRMQModuleConfig, jwtModuleConfig, JwtStrategy, MinMax, Token } from '@readme/core';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { RMQModule } from 'nestjs-rmq';

import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [
    NestjsFormDataModule.configAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService)  => ({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: configService.get<string>(`${Token.FormData}.upload`),
      limits: {
       fileSize: MinMax.Photo,
      }
      }),
      inject: [ConfigService],
    }),
    RMQModule.forRootAsync(getRMQModuleConfig(EntityName.Post)),
    JwtModule.registerAsync(jwtModuleConfig),
  ],
  controllers: [
    PostController
  ],
  providers: [
    PostService,
    PostRepository,
    JwtStrategy,
  ],
  exports: [
    PostRepository,
    PostService,
    JwtModule,
    NestjsFormDataModule
  ]
})
export class PostModule {}
