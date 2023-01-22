import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';
import { ApiAuth, ApiCommonResponses, AppInfo, Consumes, Entity, fillObject, JwtAuthGuard, Path, Property, RPC, SubcribeDTO, User, UserAuthDTO, UserCreateDTO, UserIDDTO, UserRDO, UserUpdateDTO } from '@readme/core';
import { IPost } from '@readme/shared-types';
import { FormDataRequest } from 'nestjs-form-data';
import { RMQService } from 'nestjs-rmq';
import { BffService } from './bff.service';
import { CommentDTO, CommentFullDTO, CommentIDDTO, CommentRDO } from './dto/comment.dto';
import { TypeDTO } from './dto/content/type.dto';
import { PostCreateDTO, PostIDDTO, PostUpdateDTO } from './dto/post/post.dto';
import { ClassForType, PostRDO } from './post.const';
import { PostsQueryDTO, PostsSearchForDTO } from './query/posts.query.dto';

@Controller()
export class BffController {
  constructor(
    private readonly bffService: BffService,
    private readonly rmqService: RMQService,
  ) {}

  @Post()
  @ApiAuth(Entity.User)
  @ApiQuery({ type: PostIDDTO })
  async create(
    @User() user: UserIDDTO,
    @Query() post: PostIDDTO,
    @Body() dto: CommentDTO
    ) {
    const comment = await this.rmqService.send<CommentFullDTO, IPost>(RPC.GetPost, {...dto, postId: post.postId, userId: user.userId})

    return fillObject(CommentRDO, comment);
  }

  @Delete(`${Path.Delete}`)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @ApiBearerAuth()
  @ApiQuery({ type: PostIDDTO })
  async delete(
    @Query() dto: CommentIDDTO,
    @User() user: UserIDDTO
    ) {
      await this.rmqService.notify<CommentIDDTO & UserIDDTO>(RPC.DeleteComment, {...dto, ...user})
  }

  @Get(Path.Post)
  @HttpCode(HttpStatus.OK)
  @ApiAuth(Entity.Post)
  @ApiCommonResponses(Entity.Post, {type: PostRDO, description: `${Entity.Post} ${AppInfo.Found}`})
  @ApiOkResponse({ type: PostRDO, description: `${Entity.Post} ${AppInfo.Created}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  @ApiQuery({ type:PostIDDTO, name: Property.Id})
  async getPost(
    @Query() query: PostIDDTO
  ) {
    const post= await this.rmqService.send<PostIDDTO, IPost>(RPC.GetPost, query)

    return fillObject(ClassForType[post.type], post)
  }


  @Get()
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  async getPosts(
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.rmqService.send<PostsQueryDTO, IPost[]>(RPC.GetPosts, query)

    return posts.map((post) => fillObject(ClassForType[post.type], post))
  }

  @Get(`${Path.Posts}/${Path.Search}`)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  async getPostsByItem(
    @Query() query: PostsSearchForDTO,
  ) {
    const posts = await this.rmqService.send<PostsSearchForDTO, IPost[]>(RPC.PostsSearchFor, {...query})

    return posts.map((post) => fillObject(ClassForType[post.type], post))
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

    return posts.map((post) => fillObject(ClassForType[post.type], post))
  }

  @Post(`${Path.Posts}/${Path.New}`)
  @ApiAuth(Entity.Post)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: TypeDTO, enum: ContentType })
  async createPost(
    @Body() dto: PostCreateDTO,
    @User() user: UserAuthDTO,
  ) {
    const post = await this.rmqService.send<UserAuthDTO & PostCreateDTO, IPost>(RPC.AddPost, {...dto, ...user})

    return fillObject(ClassForType[post.id], post);
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
    @User() user: UserAuthDTO
  ) {
    const post = await this.rmqService.send<PostUpdateDTO & PostIDDTO & {userId: string}, IPost>(RPC.UpdatePost, {...dto, ...query, userId: user.id})

    return fillObject(PostRDO, post);
  }

  @Delete(Path.Delete)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async destroy(
    @Query() query: PostIDDTO,
    @User() user: UserAuthDTO,
  ) {
     await this.rmqService.send<PostUpdateDTO & {userId: string}, IPost>(RPC.UpdatePost, {...query, userId: user.id})
  }

  @Post(Path.Repost)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async repost(
    @Query() query: PostIDDTO,
    @User() user: UserAuthDTO,
  ) {
    const post = await this.rmqService.send<PostIDDTO & {userId: string}, IPost>(RPC.UpdatePost, {...query, userId: user.id})

    return fillObject(ClassForType[post.type], post);
  }

  @Post(Path.Like)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async like(
    @Query() query: PostIDDTO,
    @User() user: UserAuthDTO,
  ) {
    const post = await this.rmqService.send<PostIDDTO & {userId: string}, IPost>(RPC.UpdatePost, {...query, userId: user.id})

    return fillObject(PostRDO, post);
  }

  @Post(Path.Like)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async notify(
    @User() user: UserIDDTO,
  ) {
    await this.bffService.notify(user)
  }


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
