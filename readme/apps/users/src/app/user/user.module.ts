import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Entity, getRMQModuleConfig, jwtModuleConfig, JwtStrategy, Property, Size } from '@readme/core';

import { UserModel, UserSchema } from './user.model';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    NestjsFormDataModule.config({ storage: FileSystemStoredFile, fileSystemStoragePath: 'upload', limits: { fileSize: Size.Max(Property.Avatar)}, autoDeleteFile: false }),
    RMQModule.forRootAsync(getRMQModuleConfig(Entity.User)),
    JwtModule.registerAsync(jwtModuleConfig),
  ],
  providers: [
    UserRepository,
    UserService,
    JwtStrategy,
  ],
  controllers: [
    UserController
  ],
  exports: [
    UserService,
    UserRepository,
    JwtModule
  ],
})
export class UserModule {}
