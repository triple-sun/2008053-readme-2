import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, getJWTConfig, Upload, getFormDataConfig} from '@readme/core';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(getJWTConfig()),
    NestjsFormDataModule.configAsync(getFormDataConfig(Upload.Photo)),
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
    NestjsFormDataModule
  ]
})
export class PostModule {}
