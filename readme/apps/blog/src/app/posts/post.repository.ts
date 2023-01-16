import { Injectable } from '@nestjs/common';
import { MinMax, PostInclude, SortByType } from '@readme/core';
import { ICRUDRepo, IPost,  } from '@readme/shared-types';

import { PrismaService } from '../prisma/prisma.service';
import { PostEntity } from './post.entity';
import { PostsFindQuery } from './query/posts.query.dto';

@Injectable()
export class PostRepository implements ICRUDRepo<PostEntity, number, IPost> {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async create(item: PostEntity): Promise<IPost> {
    return await this.prisma.post.create({
      data: {
        ...item.toObject(),
        },
      include: PostInclude
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: { id }
    });
  }

  public async findOne(id: number): Promise<IPost | null> {
    const exists = await this.prisma.post.findUnique({
      where: { id },
      include: PostInclude
    })

    return exists
  }

  public async find({sortBy, sort, page, isDraft, subs, authorID, type, tag, since, title}: PostsFindQuery) {
    const query = subs && !authorID
      ? { userID: { in: subs }}
      : { authorID }

    const posts = await this.prisma.post.findMany({
      where: {
        ...query,
        title: {
          contains: title
        },
        type: {
          equals: type
        },
        tags: {
          has: tag
        },
        createdAt: {
          gt: since
        },
        isDraft: isDraft ?? false
      },
      take: MinMax.PostsLimit,
      include: {
        ...PostInclude,
        _count:{ select: { comments: true }}
      },
      orderBy: [
        sortBy === SortByType.Comm
          ? { [sortBy]: {_count: sort}}
          : {[sortBy]: sort}
      ],
      skip: page > 0 ? MinMax.PostsLimit * (page - 1) : undefined,
    });

    return posts
  }

  public async update(id: number, item: PostEntity) {
    return await this.prisma.post.update({
      where: { id },
      data: item.toObject(),
      include: PostInclude
    })
  }

  public async like(id: number, likes: string[]) {
    return await this.prisma.post.update({
      where: { id },
      data: {
        likes: {
          set: likes
        }
      },
      include: PostInclude
    })
  }

  public async publish(id: number, publishAt: Date) {
    return await this.prisma.post.update({
      where: { id },
      data: {
        isDraft: false,
        publishAt: {
          set: publishAt
        }
      },
      include: PostInclude
    })
  }


}
