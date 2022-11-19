import {User} from '@readme/shared-types';
import {genSalt, hash, compare} from 'bcrypt';
import {SALT_ROUNDS} from './user.const';

export class UserEntity implements User {
  public _id: string;
  public avatar: string;
  public email: string;
  public name: string;
  public passwordHash: string;

  constructor(user: User) {
     this.fillEntity(user);
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

  public fillEntity(user: User) {
    this._id = user._id;
    this.avatar = user.avatar;
    this.email = user.email;
    this.name = user.name;
    this.passwordHash = user.passwordHash;
  }
}
