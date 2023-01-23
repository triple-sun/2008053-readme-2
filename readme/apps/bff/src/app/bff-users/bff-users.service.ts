import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { RPC, UserIDDTO } from '@readme/core';
import { IUser } from '@readme/shared-types';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class BffUsersService {
  constructor(
    private readonly rmqService: RMQService,
  ) {}
  public async notify(dto: UserIDDTO) {
    const user = await this.rmqService.send<UserIDDTO, IUser>(RPC.GetUser, dto)
    const posts = await this.rmqService.send<UserIDDTO, Post[]>(RPC.GetPosts, dto)

    const notified = await this.rmqService.notify<IUser & {posts: Post[]}>(RPC.Notify, {...user, posts})

    return notified
  }
}
