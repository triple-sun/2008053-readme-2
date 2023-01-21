import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from '@readme/shared-types';

import { UserEntity } from '../user/user.entity';
import { UserLoginDTO } from '../user/dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ErrorMessage } from '@readme/error';

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
      throw new UnauthorizedException(ErrorMessage.Common.Unauthorized);
    }

    return userEntity.toObject();
  }

  async loginUser(user: IUser) {
    const payload = {
      sub: user._id,
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return await this.jwtService.signAsync(payload)
  }
}
