import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AppError, UserLoginDTO, UserRDO } from '@readme/core';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyUser(dto: UserLoginDTO) {
    const {email, password: password} = dto;

    const user = await this.userService.getUser({email})

    const userEntity = new UserEntity(user);

    if (! await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AppError.Unauthorized);
    }

    return userEntity.toObject();
  }

  async loginUser(user: UserRDO) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return await this.jwtService.signAsync(payload)
  }
}
