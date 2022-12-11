import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { AuthError } from '../app.enum';
import { UserCreateDTO } from '../user/dto/user-create.dto';
import { UserLoginDTO } from '../user/dto/user-login.dto';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from '@readme/shared-types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: UserCreateDTO) {
    const {email, name, password} = dto;
    const user = {
      email,
      name,
      avatarUrl: '',
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

  async verifyUser(dto: UserLoginDTO) {
    const {email, password} = dto;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(AuthError.Login);
    }

    const userEntity = new UserEntity(user);

    if (! await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthError.Login);
    }

    return userEntity.toObject();
  }

  async loginUser(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      subscriptions: user.subscriptions
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
