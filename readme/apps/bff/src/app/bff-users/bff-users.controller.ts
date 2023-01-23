import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiForbiddenResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse, } from '@nestjs/swagger';
import { ApiAuth, ApiCommonResponses, APIExample, AppError, AppInfo, Consumes, Entity, fillObject, JwtAuthGuard, Path, Prefix, Property, RPC, SubscribeDTO, User, UserAuthDTO, UserCreateDTO, UserIDDTO, UserLoggedRDO, UserLoginDTO, UserLoginSchema, UserRDO, UserRegisterSchema, UserUpdateDTO, UserUpdateSchema } from '@readme/core';
import { FormDataRequest } from 'nestjs-form-data';
import { BffRpcService } from '../bff-rpc/bff-rpc.service';

@ApiTags(Prefix.Users)
@Controller(Prefix.Users)
export class BffUsersController {
  constructor(
    private readonly bffRpcService: BffRpcService
  ) {}

  @Post(Path.Login)
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponses(Entity.User, {type: UserLoggedRDO, description: `${AppInfo.Login}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  @ApiBody(UserLoginSchema)
  async login(
    @Body() dto: UserLoginDTO
  ) {
    const user = await this.bffRpcService.send(RPC.LoginUser, dto)

    return fillObject(UserLoggedRDO, user)
  }

  @Get(Path.User)
  @ApiAuth(Entity.User)
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponses(Entity.User, {type: UserRDO, description: `${Entity.User} ${AppInfo.Found}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  @ApiQuery({ name: Property.Id, example: APIExample.UserId })
  async getUser(
    @User() auth: UserAuthDTO,
    @Query() {userId}: UserIDDTO,
  ) {
    const user = await this.bffRpcService.send(RPC.GetUser, userId)

    return fillObject(UserRDO, user);
  }

  @Post(Path.Register)
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponses(Entity.User, {type: UserRDO, description: `${Entity.User} ${AppInfo.Created}`})
  @ApiConsumes(Consumes.FormData)
  @ApiBody(UserRegisterSchema)
  @FormDataRequest()
  async registerUser(
    @Body() dto: UserCreateDTO,
  ) {
    const user = await this.bffRpcService.send(RPC.AddUser, {dto})

    return fillObject(UserRDO, user);
  }

  @Post(Path.Update)
  @HttpCode(HttpStatus.OK)
  @ApiAuth(Entity.User)
  @ApiCommonResponses(Entity.User, {type: UserRDO, description: `${Entity.User} ${AppInfo.Updated}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  @ApiBody(UserUpdateSchema)
  async updateUser(
    @User() user: UserAuthDTO,
    @Body() dto: UserUpdateDTO,
  ) {
    const updated = await this.bffRpcService.send(RPC.UpdateUser, {dto, user})

    return fillObject(UserRDO, updated);
  }

  @Post(Path.Subscribe)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: AppError.Unauthorized })
  @ApiForbiddenResponse({ description: `${AppError.Unauthorized} ${Entity.User}`})
  @ApiCommonResponses(Entity.User, {type: UserRDO, description: `${Entity.User} ${AppInfo.Subscribe}`})
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ name: Property.SubToID, example: APIExample.UserId})
  @FormDataRequest()
  async subscribe(
    @User() user: UserAuthDTO,
    @Query() dto: SubscribeDTO
  ) {
    const data = await this.bffRpcService.send(RPC.Subscribe, {user, dto})

    return fillObject(UserRDO, data);
  }

  @Post(Path.Notify)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: AppError.Unauthorized })
  @ApiForbiddenResponse({ description: `${AppError.Unauthorized} ${Entity.User}`})
  @ApiCommonResponses(Entity.User, {type: UserRDO, description: `${Entity.User} ${AppInfo.Subscribe}`})
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ name: Property.SubToID, example: APIExample.UserId})
  @FormDataRequest()
  async notify(
    @User() user: UserAuthDTO,
    @Query() dto: SubscribeDTO
  ) {
    const data = await this.bffRpcService.send(RPC.Subscribe, {user, dto})

    return fillObject(UserRDO, data);
  }
}
