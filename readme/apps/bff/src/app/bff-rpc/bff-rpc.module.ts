import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ClientsModule } from "@nestjs/microservices";
import { PassportModule } from "@nestjs/passport";
import { getFormDataConfig, getJWTConfig, getRabbitMqConfig, JwtStrategy, RMQ_SERVICE, Upload } from "@readme/core";
import { NestjsFormDataModule } from "nestjs-form-data";
import { BffRpcService } from "./bff-rpc.service";

@Module({
  imports: [
    PassportModule,
    NestjsFormDataModule.configAsync(getFormDataConfig(Upload.Avatar)),
    JwtModule.registerAsync(getJWTConfig()),
    ClientsModule.registerAsync([
      {
        name: RMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
  ],
  controllers: [
  ],
  providers: [
    JwtStrategy,
    BffRpcService
  ],
  exports: [
    BffRpcService,
    PassportModule,
    JwtModule,
    NestjsFormDataModule,
    JwtStrategy
  ]
})
export class BffRpcModule {}
