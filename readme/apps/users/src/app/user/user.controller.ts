import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserRDO } from './rdo/user.rdo';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserUpdateDTO } from './dto/user-update.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { avatarExtRegExp, fillObject, getAvatarName, getAvatarUploadDest, MinMax, ParamName, Path, Prefix } from '@readme/core';
import { UserInfo } from '../app.enum';
import { UserService } from './user.service';
import { UploadFileDTO, UserAPIDesc } from '@readme/shared-types';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags(Prefix.User)
@Controller(Prefix.User)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(Path.UserID)
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Found
  })
  async show(@Param(ParamName.UserID, MongoIdValidationPipe) userID: string) {
    const user = await this.userService.getUser(userID);

    return fillObject(UserRDO, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(Path.UserID)
  @ApiBody({
    type: UserUpdateDTO
  })
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Updated
  })
  async update(
    @Param(ParamName.UserID, MongoIdValidationPipe) userID: string,
    @Body() dto: UserUpdateDTO
  ) {
    const update = await this.userService.update(userID, dto);

    return fillObject(UserRDO, update);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(`${Path.UserID}/avatar`)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: getAvatarUploadDest,
      filename: getAvatarName,
    })
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: UserAPIDesc.Avatar,
    type: UploadFileDTO
  })
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Avatar
  })
  async uploadAvatar(
    @Param(ParamName.UserID, MongoIdValidationPipe) userID: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: avatarExtRegExp,
        })
        .addMaxSizeValidator({
          maxSize: MinMax.AvatarMaxBytes
        })
        .build(),
    )
    file: Express.Multer.File
  ) {
    const update = await this.userService.update(userID, {avatarUrl: file.path});

    return fillObject(UserRDO, update);
  }
}