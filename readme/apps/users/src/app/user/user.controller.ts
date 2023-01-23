import { Body, Controller, Query } from '@nestjs/common';
import {  ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { fillObject, Prefix, RPC, UserRDO, User, UserAuthDTO, UserCreateDTO, UserUpdateDTO, SubscribeDTO, UserIDDTO, ApiCommonResponses, Entity, AppInfo } from '@readme/core';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags(Prefix.User)
@Controller(Prefix.User)
@ApiExtraModels(UserRDO)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @MessagePattern(RPC.GetUser)
  @ApiCommonResponses(Entity.User, {type: UserRDO, description: `${Entity.User} ${AppInfo.Found}`})
  async show(
    @Query() dto: UserIDDTO,
  ) {
    const user = await this.userService.getUserData(dto);

    return fillObject(UserRDO, user);
  }

  @MessagePattern(RPC.AddUser)
  @ApiCommonResponses(Entity.User, {type: UserRDO, description: `${AppInfo.Login}`})
  async register(
    @Body() dto: UserCreateDTO,
  ) {
    const user = await this.userService.registerUser(dto);

    return fillObject(UserRDO, user);
  }

  @MessagePattern(RPC.UpdateUser)
  async update(
    @User() user: UserAuthDTO,
    @Body() dto: UserUpdateDTO,
  ) {
    const update = await this.userService.updateUser(user, dto);

    return fillObject(UserRDO, update);
  }

 @MessagePattern(RPC.Subscribe)
  async subscribe(user: UserAuthDTO, dto: SubscribeDTO) {
    const update = await this.userService.subscribe(user,dto);

    return fillObject(UserRDO, update);
  }

  @MessagePattern(RPC.GetUser)
  public async getUser(dto: Partial<Pick<UserRDO, 'id' | 'email'>>) {
    return await this.userService.getUser(dto)
  }
}
