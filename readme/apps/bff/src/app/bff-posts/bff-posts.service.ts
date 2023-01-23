import { Injectable } from '@nestjs/common';
import { RPC, UserIDDTO } from '@readme/core';
import { IPost, ISub, IUser } from '@readme/shared-types';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class BffPostsService {
  constructor(
    private readonly rmqService: RMQService,
  ) {}
  async getFeed({userId}: UserIDDTO): Promise<IPost[]> {
    const user = await this.rmqService.send<string, IUser>(RPC.GetUser, userId)
    const sub = await this.rmqService.send<string, ISub>(RPC.GetSub, userId)
    const subs = [...new Set([...user.subscriptions.map((sub) => sub.toString()), userId])]
    const posts = await this.rmqService.send<{since: Date, subs: string[]}, IPost[]>(RPC.GetFeed, {since: sub.notifiedAt, subs})

     return await this.rmqService.send<{sub: ISub, posts: IPost[]}, IPost[]>(RPC.Notify, {sub, posts})
  }
}
