import { Body, Controller, Get, Post, Put, Query, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { fillObject, Path, Prefix, RPC, JwtAuthGuard, UserRDO, Upload, User, UserAuthDTO, UserCreateDTO, UserUpdateDTO, UserSubscribeDTO, APIFind, APIIndex, UserIDDTO, APICreateOrUpdate, AppInfo, Consumes, UserUpdateSchema, UserRegisterSchema } from '@readme/core';
import { UserService } from './user.service';
import { RMQRoute } from 'nestjs-rmq';

@ApiTags(Prefix.User)
@Controller(Prefix.User)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  @APIIndex({type: UserRDO, description: AppInfo.Loaded})
  async index() {
    const users = await this.userService.getUsers()

    return users.map((user) => fillObject(UserRDO, user));
  }

  @Get(Path.User)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @APIFind({type: UserRDO, description: AppInfo.Found})
  async show(
    @Query() dto: UserIDDTO,
  ) {
    const user = await this.userService.getUserData(dto);

    return fillObject(UserRDO, user);
  }

  @Post(Path.Register)
  @APICreateOrUpdate({type: UserRDO, description: AppInfo.Created}, {fieldName: Upload.Avatar}, UserRegisterSchema)
  async register(
    @Body() dto: UserCreateDTO,
  ) {
    const user = await this.userService.registerUser(dto);

    return fillObject(UserRDO, user);
  }

  @Put(`${Path.Update}`)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @APICreateOrUpdate({type: UserRDO, description: AppInfo.Updated}, {fieldName: Upload.Avatar}, UserUpdateSchema)
  async update(
    @User() user: UserAuthDTO,
    @Body() dto: UserUpdateDTO,
  ) {
    const update = await this.userService.updateUser(user, dto);

    return fillObject(UserRDO, update);
  }

  @Put(Path.Avatar)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @APICreateOrUpdate({type: UserRDO, description: AppInfo.Updated}, {fieldName: Upload.Avatar}, UserUpdateSchema)
  async uploadAvatar(
    @User() user: UserAuthDTO,
    @Body('email') email: string,
    @UploadedFile('avatar') file: Express.Multer.File
  ) {
    const update = await this.userService.uploadAvatar(user, {avatarLink: file.path});

    return fillObject(UserRDO, update);
  }

  @Post(Path.Subscribe)
  @UseGuards(JwtAuthGuard)
  async subscribe(
    @User() user: UserAuthDTO,
    @Query() dto: UserSubscribeDTO
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
