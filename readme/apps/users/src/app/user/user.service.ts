import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEvent, ExistsErrorMessage, NotFoundErrorMessage, Service, UpdatePostsDTO, UserSubscribeDTO } from '@readme/core';
import { UserCreateDTO } from './dto/user-create.dto';

import { UserUpdateDTO } from './dto/user-update.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(Service.RMQService) private readonly rmqClient: ClientProxy,
  ) {}

  async getUsers() {
    return await this.userRepository.find()
  }

  async getUser(userID: string) {
    const user = await this.userRepository.findOne(userID);

    if (!user) {
      throw new NotFoundException(
        NotFoundErrorMessage.UserNotFoundID(userID)
      )
    }

    return user;
  }

  async registerUser(dto: UserCreateDTO) {
    const {email, name, password} = dto;
    const user = {
      email,
      name,
      avatarUrl: '',
      subscribers: [],
      passwordHash: '',
      accessToken: ''
    };

    const exists = await this.userRepository.findByEmail(email);

    if (exists) {
      throw new ConflictException(
        ExistsErrorMessage.UserExitsEmail
      );
    }

    const userEntity = await new UserEntity(user).setPassword(password)

    const createdUser = await this.userRepository.create(userEntity);

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

  async updateUser(userID: string, { avatarUrl, password }: UserUpdateDTO) {
    const user = await this.getUser(userID)

    const update = {
      ...user,
      avatarUrl: avatarUrl ?? user.avatarUrl,
    }

    const userEntity = password
      ? new UserEntity(update)
      : await new UserEntity(update).setPassword(password)

    return await this.userRepository.update(userID, userEntity)
  }

  async subscribe(dto: UserSubscribeDTO) {
    const {userID, subToID} = dto;

    await this.getUser(userID);
    await this.getUser(subToID);

    const subscribed = await this.userRepository.subscribe(dto);

    this.rmqClient.emit(
      { cmd: CommandEvent.UserSubscribe },
      {
        userID,
        subToID
      }
    );

    return subscribed;
  }

  public async updatePosts(dto: UpdatePostsDTO) {
    await this.getUser(dto.userID);

    return await this.userRepository.updatePosts(dto)
  }
}
