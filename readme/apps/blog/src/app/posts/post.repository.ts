import {Injectable} from '@nestjs/common';
import { CRUDRepo, formatPostDataForCreate, formatPostDataForUpdate } from '@readme/core';
import { PostEntity } from './post.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '@prisma/client';

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

  public find() {
    return this.prisma.post.findMany({
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

  public async update(id: number, item: PostEntity) {
    const post = item.toObject();

    const update = formatPostDataForUpdate(id, post)

    return this.prisma.post.update(update)
  }
}
