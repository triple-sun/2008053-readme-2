import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getRMQModuleConfig, jwtModuleConfig } from '@readme/core';

import { UserModel, UserSchema } from './user.model';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RMQModule } from 'nestjs-rmq';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    JwtModule.registerAsync(jwtModuleConfig),
    RMQModule.forRootAsync(getRMQModuleConfig()),
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
    UserService,
    JwtModule,
    PassportModule
  ],
})
export class UserModule {}
