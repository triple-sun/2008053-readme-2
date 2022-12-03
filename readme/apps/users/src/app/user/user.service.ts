import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserUpdateDTO } from './dto/user-update.dto';
import { UserRepository } from './user.repository';
import { AuthError } from '../app.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async getUser(userID: string) {
    const user = await this.userRepository.findByID(userID);

    if (!user) {
      throw new Error(AuthError.NotFound);
    }

    return user;
  }

  async update(userID: string, { avatarUrl, password, subscribeTo } : UserUpdateDTO) {
    const user = await this.userRepository.findByID(userID);

    if (!user) {
      throw new Error(AuthError.NotFound);
    }

    const userEntity = new UserEntity(user)

    if (avatarUrl) {
      await userEntity.setAvatarUrl(avatarUrl)
    }

    if (password) {
      await userEntity.setPassword(password)
    }

    if (subscribeTo)  {
      const update = userEntity.subscriptions.includes(subscribeTo)
        ? userEntity.subscriptions.filter((sub) => sub !== subscribeTo)
        : [...userEntity.subscriptions, subscribeTo]

      await userEntity.updateSubscribers(update)
    }

    return this.userRepository.update(userID, userEntity)
  }
}
