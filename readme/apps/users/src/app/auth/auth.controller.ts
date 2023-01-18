import { Body, Controller, HttpStatus, Post} from '@nestjs/common';
import { AuthError, fillObject, Path, Prefix, UserInfo } from '@readme/core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserLoggedRDO } from '../user/rdo/user-logged.rdo';
import { UserLoginDTO } from '../user/dto/user-login.dto';
import { AuthService } from './auth.service';

@ApiTags(Prefix.Auth)
@Controller(Prefix.Auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post(Path.Login)
  @ApiResponse({
    type: UserLoggedRDO,
    status: HttpStatus.OK,
    description: UserInfo.Login
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthError.Login,
  })
  async login(
    @Body() dto: UserLoginDTO
  ) {
    const user = await this.authService.verifyUser(dto)

    const token = await this.authService.loginUser(user)

    return fillObject(UserLoggedRDO, {...user, token})
  }
}
