import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiConsumes, ApiExtraModels, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RMQRoute } from 'nestjs-rmq';
import { FormDataRequest } from 'nestjs-form-data';

import { fillObject, Path, Prefix, RPC, JwtAuthGuard, UserRDO, User, UserAuthDTO, UserCreateDTO, UserUpdateDTO, SubcribeDTO, UserIDDTO, ApiCommonResponses, Consumes, Entity, AppInfo, ApiAuth } from '@readme/core';
import { UserService } from './user.service';


@ApiTags(Prefix.User)
@Controller(Prefix.User)
@ApiExtraModels(UserRDO)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponses(Entity.User, {type: [UserRDO], description: `${Entity.User}${AppInfo.Loaded}`})
  @ApiOkResponse({ type: [UserRDO], description: `${Entity.User} ${AppInfo.Created}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  async index() {
    const users = await this.userService.getUsers()

    return users.map((user) => fillObject(UserRDO, user));
  }

  @Get(Path.User)
  @HttpCode(HttpStatus.OK)
  @ApiAuth(Entity.User)
  @ApiCommonResponses(Entity.User, {type: UserRDO, description: `${Entity.User} ${AppInfo.Found}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  async show(
    @Query() dto: UserIDDTO,
  ) {
    const user = await this.userService.getUserData(dto);

    return fillObject(UserRDO, user);
  }

  @Post(Path.Register)
  @HttpCode(HttpStatus.OK)
  @ApiAuth(Entity.User)
  @ApiCommonResponses(Entity.User, {type: UserRDO, description: `${Entity.User} ${AppInfo.Created}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  async register(
    @Body() dto: UserCreateDTO,
  ) {
    const user = await this.userService.registerUser(dto);

    return fillObject(UserRDO, user);
  }

  @Post(Path.Update)
  @HttpCode(HttpStatus.OK)
  @ApiAuth(Entity.User)
  @ApiCommonResponses(Entity.User, {type: UserRDO, description: `${Entity.User} ${AppInfo.Updated}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  async update(
    @User() user: UserAuthDTO,
    @Body() dto: UserUpdateDTO,
  ) {
    const update = await this.userService.updateUser(user, dto);

    return fillObject(UserRDO, update);
  }

  @Post(Path.Subscribe)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiAuth(Entity.User)
  @ApiCommonResponses(Entity.User, {type: UserRDO, description: `${Entity.User} ${AppInfo.Subscribe}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  async subscribe(
    @User() user: UserAuthDTO,
    @Body() dto: SubcribeDTO
  ) {
    const update = await this.userService.subscribe(user, dto);

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
