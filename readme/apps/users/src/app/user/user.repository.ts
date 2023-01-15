import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { ICRUDRepo, IUser } from '@readme/shared-types';

import { UserEntity } from './user.entity';
import { UpdatePostsDTO, UserSubscribeQuery } from '@readme/core';

@Injectable()
export class UserRepository implements ICRUDRepo<UserEntity, string, IUser> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
  }

  public async find() {
    return await this.userModel.find()
  }

  public async create(item: UserEntity): Promise<IUser> {
    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async destroy(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  public async findOne(id: string): Promise<IUser | null> {
    return await this.userModel
      .findOne({id})
      .exec();
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return await this.userModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: UserEntity): Promise<IUser> {
    return await this.userModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async subscribe({userID, subToID}: UserSubscribeQuery): Promise<IUser> {
    const isSubscribed = await this.userModel.findOne({ _id: userID, subscriptions: { '$in': [subToID] }})

    console.log({isSubscribed});

    return await this.userModel
      .findByIdAndUpdate(userID, {[isSubscribed ? '$pull' : '$addToSet']: { subscriptions: userID }}, { new: true })
      .exec()
  }

  public async updatePosts({userID, postID}: UpdatePostsDTO): Promise<IUser> {
    const isInPosts = await this.userModel.findOne({ _id: userID, posts: { '$in': [postID] }})

    return await this.userModel
      .findByIdAndUpdate(userID, {[isInPosts ? '$pull' : '$addToSet']: { postIDs: postID }}, { new: true })
      .exec()
  }
}
