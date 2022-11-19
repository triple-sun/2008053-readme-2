import { Injectable } from '@nestjs/common';
import { UserMemoryRepository } from '../user/user-memory.repository';
import { UserEntity } from '../user/user.entity';
import { AuthError } from './auth.enum';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserLoginDTO } from './dto/user-login.dto';

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
      throw new AuthError(AuthError.Email);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password)

    return this.userRepository
      .create(userEntity);
  }

  async verifyUser(dto: UserLoginDTO) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new AuthError(AuthError.Login);
    }

    const blogUserEntity = new UserEntity(existUser);
    if (! await blogUserEntity.comparePassword(password)) {
      throw new AuthError(AuthError.Login);
    }

    return blogUserEntity.toObject();
  }

  async getUser(id: string) {
    return this.userRepository.findById(id);
  }


}
