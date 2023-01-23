import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { ApiAuth, ApiCommonResponses, AppInfo, Consumes, Entity, fillObject, JwtAuthGuard, Path, RPC, SubcribeDTO, User, UserAuthDTO, UserCreateDTO, UserIDDTO, UserRDO, UserUpdateDTO } from '@readme/core';
import { IPost } from '@readme/shared-types';
import { FormDataRequest } from 'nestjs-form-data';
import { RMQService } from 'nestjs-rmq';
import { BffUsersService } from './bff-users.service';

@Controller()
export class BffUsersController {
  constructor(
    private readonly bffService: BffUsersService,
    private readonly rmqService: RMQService,
  ) {}

  @Get(Path.User)
  @HttpCode(HttpStatus.OK)
  @ApiAuth(Entity.User)
  @ApiCommonResponses(Entity.User, {type: UserRDO, description: `${Entity.User} ${AppInfo.Found}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  async getUser(
    @Query() dto: UserIDDTO,
  ) {
    const user = await this.rmqService.send<UserIDDTO, IPost>(RPC.GetUser, dto)

    return fillObject(UserRDO, user);
  }

  @Post(Path.Register)
  @HttpCode(HttpStatus.OK)
  @ApiAuth(Entity.User)
  @ApiCommonResponses(Entity.User, {type: UserRDO, description: `${Entity.User} ${AppInfo.Created}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  async registerUser(
    @Body() dto: UserCreateDTO,
  ) {
    const user = await this.rmqService.send<UserCreateDTO, IPost>(RPC.AddUser, dto)

    return fillObject(UserRDO, user);
  }

  @Post(Path.Update)
  @HttpCode(HttpStatus.OK)
  @ApiAuth(Entity.User)
  @ApiCommonResponses(Entity.User, {type: UserRDO, description: `${Entity.User} ${AppInfo.Updated}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  async updateUser(
    @User() user: UserAuthDTO,
    @Body() dto: UserUpdateDTO,
  ) {
    const updated = await this.rmqService.send<UserAuthDTO & UserUpdateDTO, IPost>(RPC.GetUser, {...user, ...dto})

    return fillObject(UserRDO, updated);
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
    const userData = await this.rmqService.send<UserAuthDTO & SubcribeDTO, IPost>(RPC.Subscribe, {...dto, ...user})

    return fillObject(UserRDO, userData);
  }
}
