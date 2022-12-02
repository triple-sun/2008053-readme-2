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

  public async exists(id: string) {
    return await this.postModel.exists({id})
  }

  public async index(): Promise<Post[]> {
    return this.postModel
      .find();
  }

  public async create(item: PostEntity) {
    const newPost = new this.postModel(item);

    if (!newPost.isRepost) {
      newPost.originID = newPost.id;
      newPost.authorID = newPost.userID
    }

    return await newPost.save();
  }

  public async destroy(id: string): Promise<void> {
    await this.postModel.deleteOne({id});
  }

  public async findByID(id: string) {
    return await this.postModel
      .findById(id)
      .populate('comments')
      .exec();
  }

  public async update(id: string, item: PostEntity) {
    await this.postModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();

    return item.toObject();
  }
}
