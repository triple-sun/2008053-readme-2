import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { ICRUDRepo, IUser } from '@readme/shared-types';

import { UserEntity } from './user.entity';
import { UserAuthDTO, SubscribeDTO } from '@readme/core';
import { Model } from 'mongoose';

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
  }

  public async findSubscribers(id: string): Promise<IUser[]> {
    return await this.userModel
      .find({ subscriptions: { '$in': [id] }})
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return await this.userModel
      .findOne({email})
  }

  public async update(id: string, item: UserEntity): Promise<IUser> {
    return await this.userModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
  }

  public async subscribe({subToId}: SubscribeDTO, {userId}: UserAuthDTO): Promise<IUser> {
    const isSubscribed = await this.userModel.findOne({ _id: userId, subscriptions: { '$in': [subToId] }})

    return await this.userModel
      .findByIdAndUpdate(userId, {[isSubscribed ? '$pull' : '$addToSet']: { subscriptions: subToId }}, { new: true })
  }
}
