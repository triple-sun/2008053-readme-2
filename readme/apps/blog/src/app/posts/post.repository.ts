import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import { CRUDRepo } from '@readme/core';
import { Post } from '@readme/shared-types';
import { PostEntity } from './post.entity';
import { PostModel } from './post.model';

@Injectable()
export class PostRepository implements CRUDRepo<PostEntity, string, Post> {
  constructor(
    @InjectModel(PostModel.name) private readonly postModel: Model<PostModel>) {
  }

  public async index(): Promise<Post[]> {
    return this.postModel
      .find();
  }

  public async create(item: PostEntity): Promise<Post> {
    const newPost = new this.postModel(item);
    return newPost.save();
  }

  public async destroy(id: string): Promise<void> {
    this.postModel.deleteOne({id});
  }

  public async findByID(id: string): Promise<Post | null> {
    return this.postModel
      .findOne({id})
      .exec();
  }

  public async update(id: string, item: PostEntity): Promise<Post> {
    return this.postModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
