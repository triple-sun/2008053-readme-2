import {Injectable} from '@nestjs/common';
import { CRUDRepo, formatPostDataForCreate, formatPostDataForUpdate } from '@readme/core';
import { PostEntity } from './post.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '@prisma/client';
import { PostQuery } from './query/post.query';
import { SortByType } from './post.enum';

@Injectable()
export class PostRepository implements CRUDRepo<PostEntity, number, Post> {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async create(item: PostEntity): Promise<Post> {
    const entityData = item.toObject();

    const post = formatPostDataForCreate(entityData)

    return this.prisma.post.create(post)
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id,
      }
    });
  }

  public async findByID(id: number) {
    return this.prisma.post.findUnique({
      where: {
        id
      },
      include: {
        comments: true,
        link: true,
        photo: true,
        quote: true,
        text: true,
        video: true,
      }
    });
  }

  public find({users, limit, type, sortBy, sort, tag, draft, page}: PostQuery) {
    return this.prisma.post.findMany({
      where:{
        userID: {
          in: users,
        },
        type: {
          equals: type
        },
        AND: {
          tags: {
            has: tag,
            isEmpty: false
          }
      },
        isDraft: draft
      },
      take: limit,
      include: {
        _count:{
          select: {
            comments: true,
          }
        },
        comments: true,
        link: true,
        photo: true,
        quote: true,
        text: true,
        video: true,
      },
      orderBy: [
        sortBy === SortByType.Comm
          ? { [sortBy]: {_count: sort}}
          : {[sortBy]: sort}
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async update(id: number, item: PostEntity) {
    const post = item.toObject();

    const update = formatPostDataForUpdate(id, post)

    return this.prisma.post.update(update)
  }
}
