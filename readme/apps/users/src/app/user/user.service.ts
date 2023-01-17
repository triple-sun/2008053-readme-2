import { ConflictException, Injectable } from '@nestjs/common';
import { RPC, UserError, validateUserAlreadyExists, validateUserExists } from '@readme/core';
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

  async getUser(userID: string) {
    const user = await this.userRepository.findOne(userID)

    validateUserExists(userID, user)

    return user;
  }

  async getUserData(userID: string) {
    const user = await this.getUser(userID)
    const subscribers = (await this.userRepository.findSubscribers(userID)).length
    const posts = await this.rmqService.send<string, number>(RPC.GetPosts, userID)

    console.log ({user})

    return {...user, posts, subscribers}
  }

  async registerUser(dto: UserCreateDTO) {
    const {email, name, password} = dto;

    validateUserAlreadyExists(await this.userRepository.findByEmail(dto.email))

    const user = {
      email,
      name,
      avatar: dto.avatar ?? '',
      notifiedAt: new Date(),
      subscribers: [],
      passwordHash: '',
    };

    const userEntity = await new UserEntity(user).setPassword(password)

    return await this.userRepository.create(userEntity);
  }

  async updateUser(userID: string, { avatar, password }: UserUpdateDTO) {
    const user = await this.getUser(userID)

    const update = {
      ...user,
      avatarUrl: avatar ?? user.avatar
    }

    const userEntity = password
      ? new UserEntity(update)
      : await new UserEntity(update).setPassword(password)

    return await this.userRepository.update(userID, userEntity)
  }

  async subscribe(dto: UserSubscribeDTO, userID: string) {
    if (userID === dto.subToID) {
      throw new ConflictException(UserError.SelfSubscribe)
    }

    return await this.userRepository.subscribe(dto, userID);
  }

  async setNotified(userID: string) {
    const user = await this.getUser(userID)

    const update = {
      ...user,
      notifiedAt: new Date(),
    }

    const userEntity = new UserEntity(update)

    return await this.userRepository.update(userID, userEntity)
  }
}
