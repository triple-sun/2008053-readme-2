import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleConfig, rmqClientConfig } from '@readme/core';

import { UserModel, UserSchema } from './user.model';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    JwtModule.registerAsync(jwtModuleConfig),
    ClientsModule.registerAsync(rmqClientConfig),
  ],
  providers: [
    UserRepository,
    UserService,
    JwtStrategy
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
