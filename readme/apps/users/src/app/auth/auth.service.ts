import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IUser } from '@readme/shared-types';
import { AuthError, ErrorMessage } from '@readme/core';

import { UserEntity } from '../user/user.entity';
import { UserLoginDTO } from '../user/dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async verifyUser(dto: UserLoginDTO) {
    const {email, password} = dto;

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new NotFoundException(ErrorMessage.User.Email.NotFound(email));
    }

    const userEntity = new UserEntity(user);

    if (! await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthError.Login);
    }

    return userEntity.toObject();
  }

  async loginUser(user: IUser) {
    const payload = {
      sub: user._id,
      email: user.email,
    };

    return await this.jwtService.signAsync(payload)
  }
}
