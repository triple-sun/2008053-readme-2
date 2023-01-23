import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';
import { RMQService } from 'nestjs-rmq';
import { FormDataRequest } from 'nestjs-form-data';
import { IPost } from '@readme/shared-types';
import { BffPostsService } from './bff-posts.service';
import { ApiAuth, ApiCommonResponses, AppInfo, AppName,
  Consumes, Entity, fillObject, JwtAuthGuard, Path, PostIDDTO,
  SearchDTO, PostsQueryDTO, Prefix, Property, RDOForType,
  RPC, User, UserAuthDTO, UserIDDTO, TagDTO, TypeDTO, AuthorIDDTO, PostCreateDTO, PostUpdateDTO } from '@readme/core';


@ApiTags(Prefix.Posts)
@Controller(AppName.BFF)export class BffPostsController {
  constructor(
    private readonly bffService: BffPostsService,
    private readonly rmqService: RMQService,
  ) {}

  @Get(Path.Post)
  @HttpCode(HttpStatus.OK)
  @ApiAuth(Entity.Post)
  @ApiCommonResponses(Entity.Post, {type: RDOForType, description: `${Entity.Post} ${AppInfo.Found}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  @ApiQuery({ type:PostIDDTO, name: Property.Id})
  async getPost(
    @Query() query: PostIDDTO
  ) {
    const post = await this.rmqService.send<PostIDDTO, IPost>(RPC.GetPost, query)

    return fillObject(RDOForType[post.type][post.type], post)
  }

  @Get()
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  @ApiCommonResponses(Entity.Post, {type: RDOForType, description: `${Entity.Post}${AppInfo.Loaded}`})
  async queryPosts(
    @Query() query: PostsQueryDTO,
    @Query() searchFor: SearchDTO | TagDTO | TypeDTO | AuthorIDDTO | UserIDDTO
  ) {
    const posts = await this.rmqService.send<PostsQueryDTO, IPost[]>(RPC.GetPosts, {...query, searchFor})

    return posts.map((post) => fillObject(RDOForType[post.type][post.type], post))
  }

  @Get()
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  @ApiCommonResponses(Entity.Post, {type: RDOForType, description: `${Entity.Post}${AppInfo.Loaded}`})
  async getPosts(
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.rmqService.send<PostsQueryDTO, IPost[]>(RPC.GetPosts, query)

    return posts.map((post) => fillObject(RDOForType[post.type][post.type], post))
  }

  @Get(`${Path.Posts}/${Path.Search}`)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  async getPostsByTitle(
    @Query() query: PostsQueryDTO,
    @Query() find: SearchDTO
  ) {
    const posts = await this.rmqService.send<PostsQueryDTO, IPost[]>(RPC.PostsSearchFor, {...query, ...find})

    return posts.map((post) => fillObject(RDOForType[post.type][post.type], post))
  }

  @Get(`${Path.Posts}/${Path.Feed}`)
  @ApiBearerAuth()
  @ApiAuth(Entity.User)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  async getFeed(
    @Query() query: PostsQueryDTO,
    @User() dto: UserAuthDTO
  ) {
    const posts = await this.rmqService.send<PostsQueryDTO & UserAuthDTO, IPost[]>(RPC.PostsForFeed, {...query, ...dto})

    return posts.map((post) => fillObject(RDOForType[post.type][post.type], post))
  }

  @Post(`${Path.Posts}/${Path.New}`)
  @ApiAuth(Entity.Post)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: TypeDTO, enum: ContentType })
  async createPost(
    @Body() dto: PostCreateDTO,
    @User() {userId}: UserAuthDTO,
  ) {
    const post = await this.rmqService.send<UserAuthDTO & PostCreateDTO, IPost>(RPC.AddPost, {...dto, ...{userId}})

    return fillObject(RDOForType[post.type][post.type], post);
  }

  @Patch(Path.Update)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async update(
    @Query() query: PostIDDTO,
    @Body() dto: PostUpdateDTO,
    @User() {userId}: UserAuthDTO
  ) {
    const post = await this.rmqService.send<PostUpdateDTO & PostIDDTO & {userId: string}, IPost>(RPC.UpdatePost, {...dto, ...query, userId})

    return fillObject(RDOForType[post.type], post);
  }

  @Delete(Path.Delete)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async destroy(
    @Query() query: PostIDDTO,
    @User() {userId}: UserAuthDTO,
  ) {
     await this.rmqService.send<PostUpdateDTO & {userId: string}, IPost>(RPC.UpdatePost, {...query, userId})
  }

  @Post(Path.Repost)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async repost(
    @Query() query: PostIDDTO,
    @User() {userId}: UserAuthDTO,
  ) {
    const post = await this.rmqService.send<PostIDDTO & {userId: string}, IPost>(RPC.UpdatePost, {...query, userId})

    return fillObject(RDOForType[post.type], post);
  }

  @Post(Path.Like)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async like(
    @Query() query: PostIDDTO,
    @User() {userId}: UserAuthDTO,
  ) {
    const post = await this.rmqService.send<PostIDDTO & {userId: string}, IPost>(RPC.UpdatePost, {...query, userId})

    return fillObject(RDOForType[post.type], post);
  }

  @Post(Path.Like)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async notify(
    @User() {userId}: UserIDDTO,
  ) {
    await this.bffService.notify({userId})
  }
}
