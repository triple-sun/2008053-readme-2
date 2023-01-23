import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AppError, UserAuthDTO, RPC, UserRDO, UserCreateDTO, UserUpdateDTO, SubcribeDTO, UserError, AppName, Property, Prefix } from '@readme/core';
import { RMQService } from 'nestjs-rmq';

import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

const logger = new Logger(`${AppName.Users}-${Prefix.Service}`)

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
    const user = await (email
      ? this.userRepository.findByEmail(email)
      : this.userRepository.findOne(id))

    if (!user) {
      throw new NotFoundException(email ? UserError.Email.NotFound(email) : UserError.Id.NotFound(id.toString()))
    }

    logger.log(`Trying to fetch user data for ${email ?? id}`)


    return user;
  }

  async getUserData({userId}: UserAuthDTO) {
    const user = await this.getUser({id: userId})

      if (!user) {
      throw new NotFoundException(UserError.Id.NotFound(userId.toString()))
    }

    return user
  }

  async registerUser({email, name, password, avatar}: UserCreateDTO) {
    const user = await this.userRepository.findByEmail(email)

    if (user) {
      throw new ConflictException(UserError.Email.Exists)
    }

    const newUserData = {
      email,
      name,
      avatar: avatar,
      notifiedAt: new Date(),
      subscribers: [],
      passwordHash: '',
    };

    const userEntity = await new UserEntity(newUserData).setPassword(password)

    logger.log(`Trying to register new user ${name} with email ${email}`)


    return await this.userRepository.create(userEntity);
  }

  async updateUser({userId}: UserAuthDTO, { avatar, password }: UserUpdateDTO) {
    const user = await this.getUser({id: userId})
    const posts = await this.rmqService.send<string, number[]>(RPC.GetPosts, user.id)
    const update = {
      ...user,
      posts,
      avatar: avatar ?? user.avatar
    }

    const userEntity = password
      ? new UserEntity(update)
      : await new UserEntity(update).setPassword(password)

    logger.log(`Trying to update user ${userId} data using ${avatar} ${password}`)


    return await this.userRepository.update(userId, userEntity)
  }

  async subscribe(user: UserAuthDTO, dto: SubcribeDTO) {
    await this.getUser({id: user.userId})

    if (user.userId === dto.subToId) {
      throw new ConflictException(AppError.SelfSubscribe)
    }

    logger.log(`Adding user ${dto.subToId} to subscriptions of user ${user.name} (${user.userId}, ${user.email})`)


    return await this.userRepository.subscribe(dto, user);
  }
}
