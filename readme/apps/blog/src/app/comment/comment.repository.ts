import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import { CRUDRepo } from '@readme/core';
import { CommentEntity } from './comment.entity';
import { CommentModel } from './comment.model';
import { Comment } from '@readme/shared-types';

@Injectable()
export class CommentRepository implements CRUDRepo<CommentEntity, string, Comment> {
  constructor(
    @InjectModel(CommentModel.name) private readonly commentModel: Model<CommentModel>) {
  }

  public async index(): Promise<Comment[]> {
    return await this.commentModel
      .find();
  }

  async findAllByPostID(postID: string) {
    return this.commentModel.find({postID})
  }

  public async create(item: CommentEntity): Promise<Comment> {
    const newPost = new this.commentModel(item);

    return await newPost.save();
  }

  public async destroy(id: string): Promise<void> {
    await this.commentModel.deleteOne({id});
  }

  public async destroyAllByPostID(postID: string): Promise<void> {
    await this.commentModel.deleteMany({postID});
  }

  public async findByID(id: string): Promise<Comment | null> {
    return await this.commentModel
      .findOne({id})
      .exec();
  }
}
