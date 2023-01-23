import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { IncludeForPost, PostsQueryDTO, Size, SortByType } from '@readme/core';
import { ICRUDRepo } from '@readme/shared-types';

import { PrismaService } from '../prisma/prisma.service';
import { PostEntity } from './post.entity';

@Injectable()
export class PostRepository implements ICRUDRepo<PostEntity, number, Post> {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async create(item: PostEntity): Promise<Post> {
    const {comments, ...data} = item.toObject()
    console.log({data}, {item})

    const commentsForDB = comments.map((comment) => {where: comment.id, create: {}})
    return await this.prisma.post.create({
      data: {
        ...data,
        comments: {
          connectOrCreate: {
            where
            create:
            comments
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

  public async findOne(id: number): Promise<Post | null> {
    console.log({id})
    const exists = await this.prisma.post.findUnique({
      where: { id },
      include: IncludeForPost
    })

    return exists
  }

  public async find({sortBy, since, page, isDraft, searchFor}: PostsQueryDTO) {
    const {userId, authorId, type, tag, title, subs} = searchFor
    const limit = title ? Size.Search.Max : Size.Query.Max
    const sortByType = sortBy ?? SortByType.Date

    const query = () => {
      switch(true) {
        case !!subs:
          return { userId: {in: subs }}
        case !!authorId:
          return { authorId: { equals: authorId.toString() }}
        case !!type:
          return { type }
        case !!tag:
          return { tags: { has: tag }}
        case !!title:
          return { title: { contains: title }}
        case !!userId:
          return { userId: { equals: userId.toString() }}
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
