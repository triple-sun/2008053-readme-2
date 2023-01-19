import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Property, getRMQModuleConfig, jwtModuleConfig, JwtStrategy, Size, AppName } from '@readme/core';
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
      fileSystemStoragePath: configService.get<string>(`${AppName.FormData}.upload`),
      limits: {
       fileSize: Size.Max(Property.Photo),
      }
      }),
      inject: [ConfigService],
    }),
    RMQModule.forRootAsync(getRMQModuleConfig(Property.Post)),
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
