import { Injectable } from '@nestjs/common';
import { toggleArrayElement } from '@readme/core';
import { UserMemoryRepository } from '../user/user-memory.repository';
import { UserEntity } from '../user/user.entity';
import { AuthError } from './auth.enum';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserUpdateDTO } from './dto/user-update.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserMemoryRepository
  ) {}

  async register(dto: UserCreateDTO) {
    const {email, name, password} = dto;
    const user = {
      email,
      name,
      passwordHash: ''
    };

    const existUser = await this.userRepository
      .findByEmail(email);

    if (existUser) {
      throw new Error(AuthError.Email);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password)

    return this.userRepository
      .create(userEntity);
  }

  async login(dto: UserLoginDTO) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new Error(AuthError.Login);
    }

    const userEntity = new UserEntity(existUser);

    if (! await userEntity.comparePassword(password)) {
      throw new Error(AuthError.Login);
    }

    return userEntity.toObject();
  }

  async getUser(id: string) {
    return this.userRepository.findByID(id);
  }

  async update(id: string, dto: UserUpdateDTO) {
    const user = await this.userRepository.findByID(id);

    if (!user) {
      throw new Error(AuthError.NotFound);
    }

    const updatedUser = new UserEntity({...user, ...dto})

    return this.userRepository.update(id, updatedUser);
  }

  async toggleSub(userID: string, targetID: string) {
    const user = await this.userRepository.findByID(userID);
    const target = await this.userRepository.findByID(targetID);

    if (!target || !user) {
      throw new Error(AuthError.NotFound);
    }

    const update = toggleArrayElement(user.subscriptions, targetID)
    const updatedUser = new UserEntity({...user, subscriptions: update})

    return this.userRepository.update(userID, updatedUser)
  }
}
