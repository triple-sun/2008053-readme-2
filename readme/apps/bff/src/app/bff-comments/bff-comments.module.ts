import { Module } from "@nestjs/common";
import { BffRpcModule } from "../bff-rpc/bff-rpc.module";
import { BffCommentsController } from "./bff-comments.controller";

@Module({
  imports: [BffRpcModule],
  controllers: [BffCommentsController],
  exports: [BffCommentsModule]
})
export class BffCommentsModule {}
