import { Injectable } from '@nestjs/common';
import {CRUDRepo} from '@readme/core';
import { Post } from '@readme/shared-types';
import { PostEntity } from './post.entity';

@Injectable()
export class PostMemoryRepository implements CRUDRepo<PostEntity, string, Post> {
  private repository: {[key: string]: Post} = {};

  public async index(): Promise<Post[]> {
    return Object.values(this.repository);
  }

  public async create(item: PostEntity): Promise<Post> {
    const entry = { ...item.toObject()};
    const id = crypto.randomUUID()

    entry._id = id

    if (!entry.isRepost) {
      entry.authorID = entry.userID;
      entry.originID = id;
    }

    this.repository[entry._id] = entry

    return {...entry};
  }

  public async findByID(id: string): Promise<Post> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: PostEntity): Promise<Post> {
    this.repository[id] = {...item.toObject(), _id: id};

    return {...this.repository[id]}
  }
}
