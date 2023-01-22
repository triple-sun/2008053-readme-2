import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AppError, UserError, UserLoginDTO } from '@readme/core';
import { IUser } from '@readme/shared-types';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async verifyUser(dto: UserLoginDTO) {
    const {email, password: password} = dto;

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new NotFoundException(UserError.Email.NotFound(email))
    }

    const userEntity = new UserEntity(user);

    if (! await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AppError.Unauthorized);
    }

    return userEntity.toObject();
  }

  async loginUser(user: IUser) {
    const payload = {
      sub: user._id,
      id: user._id,
      name: user.name,
      email: user.email,
    };

    console.log(this)

    return await this.jwtService.signAsync(payload)
  }
}
