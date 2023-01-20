import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IComment, ICRUDRepo } from '@readme/shared-types';

import { CommentEntity } from './comment.entity';
import { CommentListQuery } from './query/comment-list.query';
import { Size } from '@readme/core';

@Injectable()
export class CommentRepository implements ICRUDRepo<CommentEntity, number, IComment> {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async findOne(id: number): Promise<IComment | null> {
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

  async findAllByPostID({postID, page}: CommentListQuery): Promise<IComment[]> {
    const comments = this.prisma.comment.findMany({
      where: {
        postID
      },
      select: {
        id: true,
        comment: true,
        post: {
          select: {id: true}
        },
        userID: true,
        postID: true,
        createdAt: true
      },
      take: Size.Comments.Max,
      skip: page > 0 ? Size.Comments.Max * (page - 1) : undefined
    })

    return comments
  }

  public async create(item: CommentEntity): Promise<IComment> {
    const entityData = item.toObject();
    const {postID, userID, comment} = entityData;

    return this.prisma.comment.create(
      {
        data: {
          comment,
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
}
