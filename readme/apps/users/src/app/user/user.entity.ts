import { UsersConfig } from '@readme/core';
import { IUser } from '@readme/shared-types';
import { genSalt, hash, compare } from 'bcrypt';
import { FileSystemStoredFile } from 'nestjs-form-data';

export class UserEntity implements IUser {
  public _id: string;
  public id: string;
  public avatar?: FileSystemStoredFile;
  public avatarLink?: string;
  public email: string;
  public name: string;
  public subscriptions?: string[];
  public subscribers?: string[];
  public passwordHash: string;
  public notifiedAt?: Date;

  constructor(user: IUser) {
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

  public fillEntity(user: IUser) {
    this._id = user._id;
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar
    this.subscriptions = user.subscriptions;
    this.passwordHash = user.passwordHash;
  }
}
