import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RMQ_SERVICE, RPC } from '@readme/core';
import { handleRpcExchange } from '@readme/core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BffRpcService {
  constructor(
    @Inject(RMQ_SERVICE) private readonly rmqClient: ClientProxy
  ) {}
  public async send(rpc: RPC, args) {
    const response = await firstValueFrom(this.rmqClient.send(rpc, args))
    return handleRpcExchange(response)
  }
}
