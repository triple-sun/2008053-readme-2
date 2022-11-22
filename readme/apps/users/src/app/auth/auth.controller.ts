import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { fillObject, Path, Prefix, ParamName, User } from '@readme/core';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserRDO } from './rdo/user.rdo';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserLoggedRDO } from './rdo/user-logged.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthError, AuthInfo } from './auth.enum';
import { UserSubRDO } from './rdo/user-subs.rdo';

@ApiTags(Prefix.Auth)
@Controller(Prefix.Auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post(Path.Register)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthInfo.Register
  })
  async create(@Body() dto: UserCreateDTO) {
    const user = await this.authService.register(dto);

    return fillObject(UserRDO, user);
  }

  @Post(Path.Login)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UserLoggedRDO,
    status: HttpStatus.OK,
    description: AuthInfo.Login
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthError.Login,
  })
  async login(@Body() dto: UserLoginDTO) {
  const user = await this.authService.login(dto);

  return fillObject(UserLoggedRDO, user);
}

  @Get(Path.ID)
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: AuthInfo.Found
  })
  async show(@Param(ParamName.ID) id: string) {
    const user = await this.authService.getUser(id);

    return fillObject(UserRDO, user);
  }

  @Post(Path.ID)
  @ApiResponse({
   type: UserSubRDO,
   status: HttpStatus.OK,
   description: AuthInfo.Found
  })
  async toggleSub(@Param(ParamName.ID) targetID: string, @User(ParamName.ID) userID: string) {
    const user = await this.authService.toggleSub(userID, targetID);

    return fillObject(UserRDO, user);
  }


}
