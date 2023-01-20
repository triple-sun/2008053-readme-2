import { ConflictException, Injectable } from '@nestjs/common';
import { RPC, UserRDO, Validate } from '@readme/core';
import { ErrorMessage } from '@readme/error';
import { RMQService } from 'nestjs-rmq';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserSubscribeDTO } from './dto/user-subscribe.dto';

import { UserUpdateDTO } from './dto/user-update.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rmqService: RMQService
  ) {}
  async getUsers() {
    return await this.userRepository.find()
  }

  async getUser({id, email}: Partial<Pick<UserRDO, 'id' | 'email'>>) {
    const user = email
      ? await this.userRepository.findByEmail(email)
      : await this.userRepository.findOne(id)

    Validate.User.Exists({id, email}, user)

    return user;
  }

  async getUserData(id: string) {
    const user = await this.getUser({id})
    const subscribers = (await this.userRepository.findSubscribers(id)).length
    const posts = await this.rmqService.send<string, number>(RPC.GetPosts, id)


    return {...user, posts, subscribers}
  }

  async registerUser(dto: UserCreateDTO) {
    const {email, name, password} = dto;
    const user = await this.getUser({email})

    Validate.User.Registered(user)

    const newUserData = {
      email,
      name,
      avatar: dto.avatar ?? '',
      notifiedAt: new Date(),
      subscribers: [],
      passwordHash: '',
    };

    const userEntity = await new UserEntity(newUserData).setPassword(password)

    return await this.userRepository.create(userEntity);
  }

  async updateUser(id: string, { avatar, password }: UserUpdateDTO) {
    const user = await this.getUser({id})

    const update = {
      ...user,
      avatarUrl: avatar ?? user.avatar
    }

    const userEntity = password
      ? new UserEntity(update)
      : await new UserEntity(update).setPassword(password)

    return await this.userRepository.update(id, userEntity)
  }

  async subscribe(dto: UserSubscribeDTO, id: string) {
    await this.getUser({id})

    if (id === dto.subToID) {
      throw new ConflictException(ErrorMessage.Common.SelfSubscribe)
    }

    return await this.userRepository.subscribe(dto, id);
  }

  async setNotified(id: string) {
    const user = await this.getUser({id})

    const update = {
      ...user,
      notifiedAt: new Date(),
    }

    const userEntity = new UserEntity(update)

    return await this.userRepository.update(id, userEntity)
  }
}
