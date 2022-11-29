import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { AuthError } from './auth.enum';
import { UserCreateDTO } from '../user/dto/user-create.dto';
import { UserLoginDTO } from '../user/dto/user-login.dto';
import { UserUpdateDTO } from '../user/dto/user-update.dto';
import { UserRepository } from '../user/user.repository';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async register(dto: UserCreateDTO) {
    const {email, name, password} = dto;
    const user = {
      avatar: '',
      email,
      name,
      subscriptions: [],
      passwordHash: '',
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

  async update(userID: string, dto: UserUpdateDTO) {
    const user = await this.userRepository.findByID(userID);

    if (!user) {
      throw new Error(AuthError.NotFound);
    }

    const updatedUser = new UserEntity({...user, ...dto})

    return this.userRepository.update(userID, updatedUser);
  }

  async 
}
