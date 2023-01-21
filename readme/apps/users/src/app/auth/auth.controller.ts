import { Body, Controller, Post} from '@nestjs/common';
import { APILogin, AppInfo, fillObject, Path, Prefix, UserLoggedRDO, UserLoginDTO, UserRDO } from '@readme/core';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiTags(Prefix.Auth)
@Controller(Prefix.Auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post(Path.Login)
  @APILogin({type: UserLoggedRDO, description: AppInfo.Login})
  async login(
    @Body() dto: UserLoginDTO
  ) {
    console.log(dto)
    const user = await this.authService.verifyUser(dto)

    const token = await this.authService.loginUser(fillObject(UserRDO, user))

    return fillObject(UserLoggedRDO, {...user, token})
  }
}
