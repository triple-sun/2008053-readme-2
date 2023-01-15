import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ExistsErrorMessage, NotFoundErrorMessage, UpdatePostsDTO, UserError, UserSubscribeQuery } from '@readme/core';
import { UserCreateDTO } from './dto/user-create.dto';

import { UserUpdateDTO } from './dto/user-update.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
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

  async subscribe(dto: UserSubscribeQuery) {
    const {userID, subToID} = dto;

    await this.getUser(userID);
    await this.getUser(subToID);

    if (userID === subToID) {
      throw new ConflictException(UserError.SelfSubscribe)
    }

    return await this.userRepository.subscribe(dto);
  }

  public async updatePosts(dto: UpdatePostsDTO) {
    await this.getUser(dto.userID);

    return await this.userRepository.updatePosts(dto)
  }
}
