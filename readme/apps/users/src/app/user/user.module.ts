import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EntityName, getRMQModuleConfig, jwtModuleConfig, JwtStrategy } from '@readme/core';

import { UserModel, UserSchema } from './user.model';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    NestjsFormDataModule,
    RMQModule.forRootAsync(getRMQModuleConfig(EntityName.User)),
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
