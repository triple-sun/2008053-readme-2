import { Body, Controller, Get, HttpStatus, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillObject, Path, Prefix, UserInfo, RPC, User, JwtAuthGuard, UserRDO, APIFile, UploadType } from '@readme/core';
import { UserService } from './user.service';
import { UserUpdateDTO } from './dto/user-update.dto';
import { UserCreateDTO } from './dto/user-create.dto';
import { RMQRoute } from 'nestjs-rmq';
import { UserSubscribeDTO } from './dto/user-subscribe.dto';
import { UserQuery } from './query/user.query';
import { UserIDDTO } from './dto/user-id.dto';

@ApiTags(Prefix.User)
@Controller(Prefix.User)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  @ApiResponse({type: UserRDO, isArray: true, status: HttpStatus.OK, description: UserInfo.Found
  })
  async index(): Promise<UserRDO[]> {
    const users = await this.userService.getUsers()

    return users.map((user) => fillObject(UserRDO, user));
  }

  @Get(Path.User)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiResponse({type: UserRDO, status: HttpStatus.OK, description: UserInfo.Found})
  async show(
    @Query() query: UserQuery,
  ) {
    const user = await this.userService.getUserData(query);

    return fillObject(UserRDO, user);
  }

  @Post(Path.Register)
  @APIFile(UploadType.Avatar)
  @ApiBody({ type: UserCreateDTO})
  @ApiResponse({ type: UserRDO, status: HttpStatus.CREATED, description: UserInfo.Register })
  async register(
    @Body() dto: UserCreateDTO,
  ) {
    const user = await this.userService.registerUser(dto);

    return fillObject(UserRDO, user);
  }

  @Put(`${Path.Update}`)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UserUpdateDTO })
  @ApiResponse({
   type: UserRDO,
   status: HttpStatus.OK,
   description: UserInfo.Updated
  })
  async update(
    @User() user: UserIDDTO,
    @Body() dto: UserUpdateDTO,
  ) {
    const update = await this.userService.updateUser(user, dto);

    return fillObject(UserRDO, update);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(Path.Subscribe)
  @APIFile(UploadType.Avatar)
  @ApiResponse({ type: UserRDO, status: HttpStatus.OK,
   description: UserInfo.Updated
  })
  async subscribe(
    @User() user: UserIDDTO,
    @Query() query: UserSubscribeDTO
  ) {
    const update = await this.userService.subscribe(query, user);

    return fillObject(UserRDO, update);
  }

  @RMQRoute(RPC.GetUser)
  public async getUser(id: string) {
    return await this.userService.getUser({id})
  }

  @RMQRoute(RPC.Notified)
  public async setNotified(id: string) {
    return await this.userService.setNotified(id)
  }
}
