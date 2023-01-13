import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthError, CommandEvent, RMQ_SERVICE } from '@readme/core';
import { UserCreateDTO } from './dto/user-create.dto';

import { UserUpdateDTO } from './dto/user-update.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(RMQ_SERVICE) private readonly rmqClient: ClientProxy,
  ) {}

  async getUsers() {
    return await this.userRepository.find()
  }

  async getUser(userID: string) {
    const user = await this.userRepository.findOne(userID);

    if (!user) {
      throw new Error(AuthError.NotFound);
    }

    return user;
  }

  async register(dto: UserCreateDTO) {
    const {email, name, password} = dto;
    const user = {
      email,
      name,
      avatarUrl: '',
      subscriptions: [],
      passwordHash: '',
      accessToken: ''
    };

    const existUser = await this.userRepository
      .findByEmail(email);

    if (existUser) {
      throw new Error(AuthError.Email);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password)

    const createdUser = await this.userRepository
      .create(userEntity);


    this.rmqClient.emit(
      { cmd: CommandEvent.AddSubscriber },
      {
        email: createdUser.email,
        name: createdUser.name,
        userID: createdUser._id.toString(),
      }
    );

    return createdUser
  }

  async update(userID: string, { avatarUrl, password }: UserUpdateDTO) {
    const user = await this.userRepository.findOne(userID)

    if (!user) {
      throw new Error(AuthError.NotFound);
    }

    const update = {
      ...user,
      avatarUrl: avatarUrl ?? user.avatarUrl,
    }

    const userEntity = password
      ? new UserEntity(update)
      : await new UserEntity(update).setPassword(password)

    return await this.userRepository.update(userID, userEntity)
  }

  async subscribe(userID: string, subToID: string) {
    const user = await this.userRepository.findOne(userID)

    if (!user) {
      throw new Error(AuthError.NotFound);
    }

    const subTo = await this.userRepository.findOne(subToID)

    if (!subTo) {
      throw new Error(AuthError.Sub);
    }

    return await this.userRepository.subscribe(user, subTo)
  }
}
