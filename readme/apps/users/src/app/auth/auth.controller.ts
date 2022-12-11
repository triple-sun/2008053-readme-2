import { Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { fillObject, Path, Prefix } from '@readme/core';
import { UserCreateDTO } from '../user/dto/user-create.dto';
import { UserRDO } from '../user/rdo/user.rdo';
import { UserLoginDTO } from '../user/dto/user-login.dto';
import { UserLoggedRDO } from '../user/rdo/user-logged.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthError, UserInfo } from '../app.enum';


@ApiTags(Prefix.Auth)
@Controller(Prefix.Auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post(Path.Register)
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: UserInfo.Register
  })
  async register(@Body() dto: UserCreateDTO) {
    const user = await this.authService.register(dto);

    return fillObject(UserRDO, user);
  }

  @Post(Path.Login)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UserLoggedRDO,
    status: HttpStatus.OK,
    description: UserInfo.Login
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthError.Login,
  })
  async login(@Body() dto: UserLoginDTO) {
    const user = await this.authService.verifyUser(dto);

    return this.authService.loginUser(user)
  }
}
