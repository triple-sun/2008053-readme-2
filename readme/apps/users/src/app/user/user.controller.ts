import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { Express } from 'express';

import { CommandEvent, fillObject, MinMax, MongoIDValidationPipe, FieldName, Path, Prefix, UpdatePostsDTO, UploadFileDTO, UserAPIDesc, UserInfo, UserSubscribeQuery, getStorageOptions, UploadType, getImageUploadPipe } from '@readme/core';
import { UserService } from './user.service';
import { UserRDO } from './rdo/user.rdo';
import { UserUpdateDTO } from './dto/user-update.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserCreateDTO } from './dto/user-create.dto';
import { EventPattern } from '@nestjs/microservices';
import { RMQRoute } from 'nestjs-rmq';

@ApiTags(Prefix.User)
@Controller(Prefix.User)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Found
  })
  async index() {
    const users = await this.userService.getUsers()

    return users.map((user) => fillObject(UserRDO, user));
  }

  @UseGuards(JwtAuthGuard)
  @Get(`:${FieldName.UserID}`)
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Found
  })
  async show(
    @Param(FieldName.UserID, MongoIDValidationPipe) userID: string
  ) {
    const user = await this.userService.getUser(userID);

    return fillObject(UserRDO, user);
  }

  @Post(Path.Register)
  @UseInterceptors(
    FileInterceptor('file', getStorageOptions(UploadType.Avatar))
  )
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: UserInfo.Register
  })
  async register(
    @Body() dto: UserCreateDTO,
    @UploadedFile(getImageUploadPipe(MinMax.PhotoMaxBytes)) file: Express.Multer.File,
  ) {
    const user = await this.userService.registerUser(dto);

    return fillObject(UserRDO, user);
  }

  @Put(`${Path.Update}/:${FieldName.UserID}`)
  @ApiBody({
    type: UserUpdateDTO
  })
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Updated
  })
  async update(
    @Param(FieldName.UserID, MongoIDValidationPipe) userID: string,
    @Body() dto: UserUpdateDTO
  ) {
    const update = await this.userService.updateUser(userID, dto);

    return fillObject(UserRDO, update);
  }

  @Patch(`${Path.Avatar}/:${FieldName.UserID}`)
  @UseInterceptors(
    FileInterceptor('file', getStorageOptions(UploadType.Avatar))
  )
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
    @Param(FieldName.UserID, MongoIDValidationPipe) userID: string,
    @UploadedFile(getImageUploadPipe(MinMax.PhotoMaxBytes)) file: Express.Multer.File,
  ) {
    const update = await this.userService.updateUser(userID, {avatarUrl: file.path});

    return fillObject(UserRDO, update);
  }

  @Patch(Path.Subscribe)
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Updated
  })
  async subscribe(
    @Query() query: UserSubscribeQuery
  ) {
    const update = await this.userService.subscribe(query);

    return fillObject(UserRDO, update);
  }

  @EventPattern({ cmd: CommandEvent.DeletePost})
  public async updatePosts(dto: UpdatePostsDTO) {
    return this.userService.updatePosts(dto)
  }

  @RMQRoute('rpc-users')
  public async getSubs(userID: string) {
    const user = await this.userService.getUser(userID)

    return user.subscriptions.map((sub) => sub.toString())
  }
}
