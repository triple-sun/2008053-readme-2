import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getFormDataConfig, getJWTConfig, JwtStrategy, Upload } from '@readme/core';

import { UserModel, UserSchema } from './user.model';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(getJWTConfig()),
    NestjsFormDataModule.configAsync(getFormDataConfig(Upload.Avatar)),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
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
    UserRepository,
    JwtModule,
    PassportModule,
    NestjsFormDataModule
  ],
})
export class UserModule {}
