import { Module } from "@nestjs/common";
import { JwtStrategy } from "@readme/core";
import { BffRpcModule } from "../bff-rpc/bff-rpc.module";
import { BffUsersController } from "./bff-users.controller";

@Module({
  imports: [
    BffRpcModule
  ],
  controllers: [
    BffUsersController
  ],
  providers: [
    JwtStrategy
  ],
  exports: [
  ]
})
export class BffUsersModule {}
