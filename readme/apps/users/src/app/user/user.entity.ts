import { fillEntity } from '@readme/core';
import {User} from '@readme/shared-types';
import {genSalt, hash, compare} from 'bcrypt';
import {SALT_ROUNDS} from './user.const';

export class UserEntity implements User {
  public _id: string;
  public avatar?: string;
  public email: string;
  public name: string;
  public subscriptions: string[];
  public passwordHash: string;

  constructor(user: User) {
     fillEntity<User, UserEntity>(user, this);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toObject() {
    return {...this};
  }
}
