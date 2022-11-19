import { Injectable } from '@nestjs/common';
import {CRUDRepo} from '@readme/core';
import { Comment } from '@readme/shared-types';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentMemoryRepository implements CRUDRepo<CommentEntity, string, Comment> {
  private repository: {[key: string]: Comment} = {};

  public async index(): Promise<Comment[]> {
    return Object.values(this.repository);
  }

  public async create(item: CommentEntity): Promise<Comment> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID()};

    this.repository[entry._id] = entry

    return {...entry};
  }

  public async findByID(id: string): Promise<Comment> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }
}
