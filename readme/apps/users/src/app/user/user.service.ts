import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AppError, UserAuthDTO, RPC, UserRDO, UserCreateDTO, UserUpdateDTO, UserSubscribeDTO, UserError } from '@readme/core';
import { RMQService } from 'nestjs-rmq';

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
    const user = await (email
      ? this.userRepository.findByEmail(email)
      : this.userRepository.findOne(id))

    if (!user) {
      throw new NotFoundException(email ? UserError.Email.NotFound : UserError.Id.NotFound)
    }
    
    return user;
  }

  async getUserData({id}: UserAuthDTO) {
    const user = await this.getUser({id})

    const subscribers = (await this.userRepository.findSubscribers(id)).length
    const posts = await this.rmqService.send<string, number>(RPC.GetPosts, id)


    return {...user, posts, subscribers}
  }

  async registerUser({email, name, password, avatarLink}: UserCreateDTO) {
    const user = await this.userRepository.findByEmail(email)

    if (user) {
      throw new ConflictException(UserError.Email.Exists)
    }

    const newUserData = {
      email,
      name,
      avatarLink: avatarLink ?? user.avatarLink,
      notifiedAt: new Date(),
      subscribers: [],
      passwordHash: '',
    };

    const userEntity = await new UserEntity(newUserData).setPassword(password)

    return await this.userRepository.create(userEntity);
  }

  async updateUser({id}: UserAuthDTO, { avatarLink, password }: UserUpdateDTO) {
    const user = await this.getUser({id})

    const update = {
      ...user,
      avatarLink: avatarLink ?? user.avatarLink
    }

    const userEntity = password
      ? new UserEntity(update)
      : await new UserEntity(update).setPassword(password)

    return await this.userRepository.update(id, userEntity)
  }

  async uploadAvatar({id}: UserAuthDTO, { avatarLink }: UserUpdateDTO) {
    const user = await this.getUser({id})

    const update = {
      ...user,
      avatarLink: avatarLink ?? user.avatarLink
    }

    const userEntity = new UserEntity(update)
    return await this.userRepository.update(id, userEntity)
  }

  async subscribe(user: UserAuthDTO, dto: UserSubscribeDTO) {
    const {id} = user
    await this.getUser({id})

    if (id === dto.subToID) {
      throw new ConflictException(AppError.SelfSubscribe)
    }

    return await this.userRepository.subscribe(dto, user);
  }

  async setNotified(id: string) {
    const user = await this.getUser({id})

    const userEntity = new UserEntity({...user, notifiedAt: new Date()})

    return await this.userRepository.update(id, userEntity)
  }
}
