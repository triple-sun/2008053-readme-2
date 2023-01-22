import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RMQRoute } from 'nestjs-rmq';
import { ContentType } from '@prisma/client';
import { fillObject, Prefix, Path, Property, User, JwtAuthGuard, MongoIDValidationPipe, RPC, Entity, Consumes, UserAuthDTO, AppInfo, ApiCommonResponses, ApiAuth } from '@readme/core';

import { PostsQueryDTO, SearchDTO } from './query/posts.query.dto';
import { PostCreateDTO, PostIDDTO, TagDTO, PostUpdateDTO, AuthorIDDTO } from './dto/post/post.dto';
import { PostService } from './post.service';
import { FormDataRequest } from 'nestjs-form-data';
import { ClassForType, PostRDO } from './post.const';
import { TypeDTO } from './dto/content/type.dto';

@ApiTags(Prefix.Posts)
@Controller(Prefix.Posts)
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get(Path.Post)
  @HttpCode(HttpStatus.OK)
  @ApiAuth(Entity.Post)
  @ApiCommonResponses(Entity.Post, {type: PostRDO, description: `${Entity.Post} ${AppInfo.Found}`})
  @ApiOkResponse({ type: PostRDO, description: `${Entity.Post} ${AppInfo.Created}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  @ApiQuery({ type:PostIDDTO, name: Property.Id})
  async show(
    @Query() dto: PostIDDTO
  ) {
    const post = await this.postService.getPost(dto);

    return fillObject(PostRDO, post)
  }

  @Get()
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  async getAllPosts(
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPosts(query)

    return posts.map((post) => fillObject(PostRDO, post))
  }

  @Get(Path.Feed)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  async getFeed(
    @User() dto: UserAuthDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getFeed(dto, query)

    return posts.map((post) => fillObject(PostRDO, post))
  }

  @Get(Path.Tag)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  @ApiQuery({ name: Property.Tag, type: TagDTO })
  async getPostsByTag(
    @Query() dto: TagDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPostsByTag(dto, query)

    return posts.map((post) => fillObject(PostRDO, post))
  }

  @Get(Path.Type)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  @ApiQuery({ name: Property.Type, enum: ContentType, type: TypeDTO })
  async getPostsByType(
    @Query() dto: TypeDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPostsByType(dto, query)

    return posts.map((post) => fillObject(PostRDO, post))
  }

  @Get(Path.Author)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  @ApiQuery({ name: Property.AuthorID, type: UserAuthDTO})
  async getPostsByAuthor(
    @Query(Property.AuthorID, MongoIDValidationPipe) dto: AuthorIDDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPostsByAuthor(dto, query)

    return posts.map((post) => fillObject(PostRDO, post))
  }

  @Get(Path.Search)
  @ApiConsumes(Consumes.FormData)
  @ApiQuery({ type: PostsQueryDTO, name: Property.Query })
  @ApiQuery({ type: SearchDTO, name: Property.Search })
  async getPostsByTitle(
    @Query() dto: SearchDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPostsByTitle(dto, query)

    return posts.map((post) => fillObject(PostRDO, post))
  }

  @Get(Path.Drafts)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  async getDrafts(
    @User() user: UserAuthDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getDrafts(user, query)

    return posts.map((post) => fillObject(PostRDO, post))
  }

  @Post(Path.New)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @ApiBearerAuth()
  @ApiQuery({ type: TypeDTO, enum: ContentType })
  async create(
    @User() user: UserAuthDTO,
    @Body() dto: PostCreateDTO,
    @Query() query: TypeDTO
  ) {
    const post = await this.postService.createPost(user, query, dto)

    return fillObject(PostRDO, post);
  }

  @Patch(Path.Update)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async update(
    @Query() query: PostIDDTO,
    @User() user: UserAuthDTO,
    @Body() dto: PostUpdateDTO,
  ) {
    const post = await this.postService.updatePost(query, user, dto);

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
    await this.postService.deletePost(query, user)
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
    const post = await this.postService.repost(query, user);
    const rdo = ClassForType[post.type]

    return fillObject(rdo, post);
  }

  @Post(Path.Like)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ type: PostsQueryDTO })
  @ApiQuery({ type: PostIDDTO })
  async like(
    @Param() query: PostIDDTO,
    @User() user: UserAuthDTO,
  ) {
    const post = await this.postService.likePost(query, user);

    return fillObject(PostRDO, post);
  }

  @RMQRoute(RPC.GetPosts)
  @ApiOkResponse({type: [Post]})
  async getPostsByUser(
    @User() user: UserAuthDTO,
  ) {
    return (await this.postService.getPostsByUser(user))
  }
}
