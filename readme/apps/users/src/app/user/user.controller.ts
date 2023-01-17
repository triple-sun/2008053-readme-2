import { Body, Controller, Get, HttpStatus, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillObject, MinMax, Path, Prefix, UserInfo, RPC, UserID, JwtAuthGuard } from '@readme/core';
import { UserService } from './user.service';
import { UserRDO } from './rdo/user.rdo';
import { UserUpdateDTO } from './dto/user-update.dto';
import { UserCreateDTO } from './dto/user-create.dto';
import { RMQRoute } from 'nestjs-rmq';
import { UserSubscribeDTO } from './dto/user-subscribe.dto';
import { UserQuery } from './query/user.query';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

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

  @Get(Path.User)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Found
  })
  async show(
    @Query() {userID}: UserQuery,
  ) {
    const user = await this.userService.getUserData(userID);

    return fillObject(UserRDO, user);
  }

  @Post(Path.Register)
  @FormDataRequest({ storage: FileSystemStoredFile, fileSystemStoragePath: 'upload', limits: { fileSize: MinMax.Avatar }, autoDeleteFile: false})
  @ApiBody({ type: UserCreateDTO})
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: UserInfo.Register
  })
  async register(
    @Body() dto: UserCreateDTO,
  ) {
    const user = await this.userService.registerUser(dto);

    return fillObject(UserRDO, user);
  }

  @Put(`${Path.Update}`)
  @UseGuards(JwtAuthGuard)
  @FormDataRequest({ storage: FileSystemStoredFile, fileSystemStoragePath: 'upload', limits: { fileSize: MinMax.Avatar }, autoDeleteFile: false})
  @ApiBody({
    type: UserUpdateDTO
  })
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Updated
  })
  async update(
    @Body() dto: UserUpdateDTO,
    @UserID() userID: string,
  ) {
    const update = await this.userService.updateUser(userID, dto);

    return fillObject(UserRDO, update);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(Path.Subscribe)
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Updated
  })
  async subscribe(
    @UserID() userID: string,
    @Query() query: UserSubscribeDTO
  ) {
    const update = await this.userService.subscribe(query, userID);

    return fillObject(UserRDO, update);
  }

  @RMQRoute(RPC.GetUser)
  public async getUser(userID: string) {
    return await this.userService.getUser(userID)
  }

  @RMQRoute(RPC.Notified)
  public async setNotified(userID: string) {
    return await this.userService.setNotified(userID)
  }
}
