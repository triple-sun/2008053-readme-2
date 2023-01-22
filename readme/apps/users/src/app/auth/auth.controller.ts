import { Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import { ApiCommonResponses, AppInfo, Consumes, Entity, fillObject, Path, Prefix, UserLoggedRDO, UserLoginDTO } from '@readme/core';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { FormDataRequest } from 'nestjs-form-data';

@ApiTags(Prefix.Auth)
@Controller(Prefix.Auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post(Path.Login)
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponses(Entity.User, {type: UserLoggedRDO, description: `${AppInfo.Login}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  async login(
    @Body() dto: UserLoginDTO
  ) {
    const user = await this.authService.verifyUser(dto)
    const token = await this.authService.loginUser(user)

    console.log({token})

    return fillObject(UserLoggedRDO, {...user, token})
  }
}
