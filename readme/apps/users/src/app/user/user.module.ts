import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Entity, getRMQModuleConfig, jwtModuleConfig, JwtStrategy } from '@readme/core';

import { UserModel, UserSchema } from './user.model';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    RMQModule.forRootAsync(getRMQModuleConfig(Entity.User)),
    JwtModule.registerAsync(jwtModuleConfig),
  ],
  providers: [
    UserRepository,
    UserService,
    JwtStrategy,
    JwtService
  ],
  controllers: [
    UserController
  ],
  exports: [
    UserService,
    UserRepository,
    JwtStrategy,
    JwtService
  ],
})
export class UserModule {}
