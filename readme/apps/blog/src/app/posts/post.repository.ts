import { Injectable } from '@nestjs/common';
import { IncludeForPost, Size, SortByType } from '@readme/core';
import { ICRUDRepo, IPost } from '@readme/shared-types';

import { PrismaService } from '../prisma/prisma.service';
import { PostEntity } from './post.entity';
import { PostsFindQuery } from './query/posts.query.dto';

@Injectable()
export class PostRepository implements ICRUDRepo<PostEntity, number, IPost> {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async create(item: PostEntity): Promise<IPost> {
    const {comments, ...data} = item.toObject()
    console.log({data}, {item})
    return await this.prisma.post.create({
      data: {
        ...data,
        comments: {
          create: comments
        }
      },
      include: IncludeForPost
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: { id }
    });
  }

  public async findOne(id: number): Promise<IPost | null> {
    console.log({id})
    const exists = await this.prisma.post.findUnique({
      where: { id },
      include: IncludeForPost
    })

    return exists
  }

  public async find({sortBy, page, isDraft, subs, authorID, type, tag, since, title, userID}: PostsFindQuery) {
    const limit = title ? Size.Search.Max : Size.Query.Max
    const sortByType = sortBy ?? SortByType.Date

    const query = () => {
      switch(true) {
        case !!subs:
          return { userID: { in: subs }}
        case !!authorID:
          return { authorID: { equals: authorID }}
        case !!type:
          return { type }
        case !!tag:
          return { tags: { has: tag }}
        case !!title:
          return { title: { contains: title }}
        case !!userID:
          return { userID: { equals: userID }}
        default:
          return {}
      }
    }

    const posts = await this.prisma.post.findMany({
      where: {
        ...query(),
        createdAt: {
          gt: since ?? undefined
        },
        isDraft: isDraft ?? false
      },
      take: limit,
      include: {
        ...IncludeForPost,
        _count:{ select: { comments: true }}
      },
      orderBy: [
        sortByType === SortByType.Comm
          ? { [sortByType]: {_count: 'desc'}}
          : { [sortByType]: 'desc' }
      ],
      skip: page > 0 && title ? limit * (page - 1) : undefined,
    });

    return posts
  }


  public async update(id: number, item: PostEntity) {
    const {comments, ...data} = item.toObject()
    return await this.prisma.post.update({
      where: { id },
      data: {
        ...data,
        comments: {
          connect: comments
        }
      },
      include: IncludeForPost
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
      include: IncludeForPost
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
      include: IncludeForPost
    })
  }


}
