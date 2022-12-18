import { UsersConfig } from '@readme/core';
import { User } from '@readme/shared-types';
import { genSalt, hash, compare } from 'bcrypt';
import { Types } from 'mongoose';

export class UserEntity implements User {
  public _id: Types.ObjectId;
  public avatarUrl: string;
  public email: string;
  public name: string;
  public subscriptions: User[];
  public passwordHash: string;
  public accessToken: string;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(UsersConfig.SaltRounds);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.avatarUrl = user.avatarUrl;
    this.email = user.email;
    this.subscriptions = user.subscriptions;
    this.passwordHash = user.passwordHash;
  }
}
