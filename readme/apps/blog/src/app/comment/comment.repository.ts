import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Comment, CRUDRepo } from '@readme/shared-types';

import { CommentEntity } from './comment.entity';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class CommentRepository implements CRUDRepo<CommentEntity, number, Comment> {
  constructor(
    private readonly prisma: PrismaService
    ) {}

  async findAllByPostID({postID, limit}: CommentQuery): Promise<Comment[]> {
    const comments = this.prisma.comment.findMany({
      where: {
        postID
      },
      select: {
        id: true,
        text: true,
        post: {
          select: {id: true}
        },
        userID: true,
        createdAt: true
      },
      take: limit
    })

    return comments
  }

  public async create(item: CommentEntity): Promise<Comment> {
    const entityData = item.toObject();
    const {postID, userID, text} = entityData;

    return this.prisma.comment.create(
      {
        data: {
          text,
          userID,
          post: {
            connect: {
              id: postID
            }
          }
        },
        include: {
          post: {
            select: {
              id: true,
            }
          },
        }
      }
    );
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {id}
    });
  }

  public async findOne(id: number): Promise<Comment | null> {
    return await this.prisma.comment.findFirst({
      where: {id},
      include: {
        post: {
          select: {
            id: true
          }
        }
      }
    });
  }
}
