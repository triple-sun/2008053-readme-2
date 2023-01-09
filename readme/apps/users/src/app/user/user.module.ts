import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig, getRMQConfig, RMQ_SERVICE } from '@readme/core';

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
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema}
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService]
    }),
    ClientsModule.registerAsync([
      {
        name: RMQ_SERVICE,
        useFactory: getRMQConfig,
        inject: [ConfigService]
      }
    ]),
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
