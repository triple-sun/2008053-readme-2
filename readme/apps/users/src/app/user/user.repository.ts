import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import { CRUDRepo } from '@readme/core';
import { UserEntity } from './user.entity';
import { User } from '@readme/shared-types';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository implements CRUDRepo<UserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
  }

  public async create(item: UserEntity): Promise<User> {
    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.deleteOne({id});
  }

  public async findByID(id: string): Promise<User | null> {
    return this.userModel
      .findOne({id})
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
