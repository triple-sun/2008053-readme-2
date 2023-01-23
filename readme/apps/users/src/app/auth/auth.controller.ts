import { Controller } from '@nestjs/common';
import { Prefix, RPC,UserLoginDTO } from '@readme/core';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { UserEntity } from '../user/user.entity';

@ApiTags(Prefix.Auth)
@Controller(Prefix.Auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  @MessagePattern(RPC.LoginUser)
  async login(dto: UserLoginDTO) {
    console.log({dto})
    const user = await this.authService.verifyUser(dto)

    if (typeof user === typeof UserEntity) {
      return await this.authService.loginUser(user as UserEntity)
  }

    return user
  }
}
