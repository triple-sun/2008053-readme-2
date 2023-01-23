import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AppError, UserAuthDTO, UserRDO, UserCreateDTO, UserUpdateDTO, SubscribeDTO, UserError } from '@readme/core';

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

  async getUser({id, email}: Partial<Pick<UserRDO, 'id' | 'email'>>) {
    const user = await (email
      ? this.userRepository.findByEmail(email)
      : this.userRepository.findOne(id))

    if (!user) {
      throw new NotFoundException(email ? UserError.Email.NotFound(email) : UserError.Id.NotFound(id.toString()))
    }

    return user;
  }

  async getUserData({userId}: UserAuthDTO) {
    const user = await this.getUser({id: userId})

    if (!user) {
       return UserError.Id.NotFound(userId.toString())
    }

    return user
  }

  async registerUser({email, name, password, avatar}: UserCreateDTO) {
    const user = await this.userRepository.findByEmail(email)

    if (user) {
      return UserError.Email.Exists(email)
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

    Logger.log(`Creating to register new user with email ${email}`)

    const created =  await this.userRepository.create(userEntity);

    Logger.log(`Success!`)

    return created

  }

  async updateUser({userId}: UserAuthDTO, { avatar, password }: UserUpdateDTO) {
    const user = await this.getUser({id: userId})
    //const posts = await this.rmqService.send<string, number[]>(RPC.GetPosts, user.id)
    const update = {
      ...user,
      avatar: avatar ?? user.avatar
    }

    const userEntity = password
      ? new UserEntity(update)
      : await new UserEntity(update).setPassword(password)

    Logger.log(`Trying to update user ${userId} data using ${avatar} ${password}`)


    return await this.userRepository.update(userId, userEntity)
  }

  async subscribe({name, userId, email}: UserAuthDTO, {subToId}: SubscribeDTO) {
    await this.getUser({id: userId})

    if (userId === subToId) {
      throw new ConflictException(AppError.SelfSubscribe)
    }

    await this.getUser({id: subToId})

    Logger.log(`Adding user ${subToId} to subscriptions of user ${name} (${userId}, ${email})`)

    return await this.userRepository.subscribe({subToId}, {userId});
  }
}
