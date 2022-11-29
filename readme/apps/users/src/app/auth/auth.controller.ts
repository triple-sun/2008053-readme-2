import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { fillObject, Path, Prefix, ParamName, MinMax } from '@readme/core';
import { UserCreateDTO } from '../user/dto/user-create.dto';
import { UserRDO } from '../user/rdo/user.rdo';
import { UserLoginDTO } from '../user/dto/user-login.dto';
import { UserLoggedRDO } from '../user/rdo/user-logged.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthError, AuthInfo } from './auth.enum';
import { UserUpdateDTO } from '../user/dto/user-update.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer'

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

  @Get(Path.UserID)
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: AuthInfo.Found
  })
  async show(@Param(ParamName.ID) id: string) {
    const user = await this.authService.getUser(id);

    return fillObject(UserRDO, user);
  }

  @Patch(Path.UserID)
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: AuthInfo.Updated
  })
  async update(
    @Param(ParamName.ID) userID: string,
    @Body() dto: UserUpdateDTO
  ) {
    const update = await this.authService.update(userID, dto);

    return fillObject(UserRDO, update);
  }

  @Patch(Path.UserID)
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: AuthInfo.Updated
  })
  async uploadAvatar(
    @Param(ParamName.ID) userID: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: (/\.(jpe?g|png)$/i),
        })
        .addMaxSizeValidator({
          maxSize: MinMax.AvatarMaxBytes
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),
    )
    file: Express.Multer.File
  ) {
    const update = await this.authService.update(userID, {avatar: file.path});

    return fillObject(UserRDO, update);
  }
}
