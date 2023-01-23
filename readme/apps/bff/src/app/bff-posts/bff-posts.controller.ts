import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';
import { FormDataRequest } from 'nestjs-form-data';
import {
  ApiAuth, ApiCommonResponses, AppInfo,
  Consumes, Entity,  JwtAuthGuard, Path, PostIDDTO, PostsFullQueryDTO, Prefix, Property, fillRDOForPost,
  RPC, User, UserAuthDTO,PostCreateDTO, PostUpdateDTO, PostsQueryDTO, SearchFor
} from '@readme/core';
import { BffRpcService } from '../bff-rpc/bff-rpc.service';


@ApiTags(Prefix.Posts)
@Controller(Prefix.Posts)
export class BffPostsController {
  constructor(
    private readonly bffRpcService: BffRpcService,
  ) {}

  @Get(Path.Post)
  @HttpCode(HttpStatus.OK)
  @ApiAuth(Entity.Post)
  @ApiCommonResponses(Entity.Post, {type: fillRDOForPost, description: `${Entity.Post} ${AppInfo.Found}`})
  @ApiOkResponse({ description: `${Entity.Post} ${AppInfo.Created}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  async show(
    @Query() dto: PostIDDTO
  ) {
    const post = await this.bffRpcService.send(RPC.GetPost, dto)

    return fillRDOForPost(post)
  }

  @Get()
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  @ApiCommonResponses(Entity.Post, {type: [fillRDOForPost], description: `${Entity.Post}s ${AppInfo.Loaded}`})
  async searchPosts(
    @Query() query: PostsQueryDTO,
    @Query() searchFor: SearchFor
  ) {
    const posts = await this.bffRpcService.send(RPC.GetPosts, {...query, searchFor})

    return posts.map(fillRDOForPost)
  }

  @Get(Path.Feed)
  @ApiAuth(Entity.Post)
  @ApiConsumes(Consumes.FormData)
  @ApiCommonResponses(Entity.Post, {type: [fillRDOForPost], description: `${Entity.Post}s ${AppInfo.Loaded}`})
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  async getFeed(
    @Query() query: PostsQueryDTO,
    @User() {userId}: UserAuthDTO
  ) {
    const user = await this.bffRpcService.send(RPC.GetUser, userId)
    const posts = await this.bffRpcService.send(RPC.PostsForFeed, {...query, searchFor: { subs: user.subs, userId }})

    return posts.map(fillRDOForPost)
  }

  @Post(`${Path.Posts}/${Path.New}`)
  @ApiAuth(Entity.Post)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: fillRDOForPost, enum: ContentType })
  async createPost(
    @Body() dto: PostCreateDTO,
    @User() {userId}: UserAuthDTO,
  ) {
    const post = await this.bffRpcService.send(RPC.AddPost, {...dto, ...{userId}})

    return fillRDOForPost(post);
  }

  @Patch(Path.Update)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsFullQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async update(
    @Query() query: PostIDDTO,
    @Body() dto: PostUpdateDTO,
    @User() {userId}: UserAuthDTO
  ) {
    const post = await this.bffRpcService.send(RPC.UpdatePost, {...dto, ...query, userId})

    return fillRDOForPost(post);
  }

  @Delete(Path.Delete)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsFullQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async destroy(
    @Query() query: PostIDDTO,
    @User() {userId}: UserAuthDTO,
  ) {
     await this.bffRpcService.send(RPC.UpdatePost, {...query, userId})
  }

  @Post(Path.Repost)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsFullQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async repost(
    @Query() query: PostIDDTO,
    @User() {userId}: UserAuthDTO,
  ) {
    const post = await this.bffRpcService.send(RPC.UpdatePost, {...query, userId})

    return fillRDOForPost(post);
  }

  @Post(Path.Like)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsFullQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async like(
    @Query() query: PostIDDTO,
    @User() {userId}: UserAuthDTO,
  ) {
    const post = await this.bffRpcService.send(RPC.UpdatePost, {...query, userId})

    return fillRDOForPost(post);
  }
}
