import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiConsumes, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RMQRoute } from 'nestjs-rmq';
import { ContentType } from '@prisma/client';
import { fillObject, Prefix, PostInfo, Path, Property, User, JwtAuthGuard, MongoIDValidationPipe, RPC, UserEntityDTO, getFileDecorators, Upload } from '@readme/core';

import { PostsQueryDTO } from './query/posts.query.dto';
import { PostRDO } from './dto/post/post.rdo';
import { AuthorIDDTO, PostCreateDTO, PostIDDTO, PostToggleDTO, TagDTO, TypeDTO } from './dto/post/post.dto';
import { TitleDTO } from './dto/content/title.dto';
import { PostService } from './post.service';

@ApiTags(Prefix.Posts)
@Controller(Prefix.Posts)
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get(`${Path.Post}/:${Property.PostID}`)
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: HttpStatus.OK, description: PostInfo.Found })
  async show(
    @Param() dto: PostIDDTO
  ) {
    const post = await this.postService.getPost(dto);

    return fillObject(PostRDO, post)
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: PostInfo.Loaded })
  async getAllPosts(
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPosts(query)

    return posts.map((post) => fillObject(PostRDO, post))
  }

  @Get(`${Path.Feed}`)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: HttpStatus.OK, description: PostInfo.Loaded })
  async getFeed(
    @User() dto: UserEntityDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getFeed(dto, query)

    return posts.map((post) => fillObject(PostRDO, post))
  }

  @Get(`${Path.Tag}/:${Property.Tag}`)
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: HttpStatus.OK, description: PostInfo.Loaded })
  async getPostsByTag(
    @Param() dto: TagDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPostsByTag(dto, query)

    return posts.map((post) => fillObject(PostRDO, post))
  }

  @Get(`${Path.Type}`)
  @ApiConsumes('multipart/form-data')
  @ApiQuery({enum: ContentType})
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByType(
    @Query() dto: TypeDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPostsByType(dto, query)

    return posts.map((post) => fillObject(PostRDO, post))
  }

  @Get(`${Path.Users}/:${Property.AuthorID}`)
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByAuthor(
    @Param(Property.AuthorID, MongoIDValidationPipe) dto: AuthorIDDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPostsByAuthor(dto, query)

    return posts.map((post) => fillObject(PostRDO, post))
  }

  @Get(`${Path.Title}/:${Property.Title}`)
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByTitle(
    @Param() dto: TitleDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPostsByTitle(dto, query)

    return posts.map((post) => fillObject(PostRDO, post))
  }

  @Get(`${Path.Drafts}`)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: HttpStatus.OK, description: PostInfo.Loaded })
  async getDrafts(
    @User() user: UserEntityDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getDrafts(user, query)

    return posts.map((post) => fillObject(PostRDO, post))
  }

  @Post(`${Path.New}`)
  @UseGuards(JwtAuthGuard)
  @getFileDecorators(Upload.Photo)
  @ApiQuery({enum: ContentType})
  @ApiResponse({ type: PostRDO, status: HttpStatus.CREATED, description: PostInfo.Created })
  async create(
    @User() user: UserEntityDTO,
    @Body() dto: PostCreateDTO,
    @Query() query: TypeDTO
  ) {
    const post = await this.postService.createPost(user, query, dto)

    return fillObject(PostRDO, post);
  }

  @Patch(`${Path.Update}/:${Property.PostID}`)
  @UseGuards(JwtAuthGuard)
  @getFileDecorators(Upload.Photo)
  @ApiResponse({ type: PostRDO, status: HttpStatus.OK, description: PostInfo.Updated })
  async update(
    @Query() query: PostIDDTO,
    @User() user: UserEntityDTO,
    @Body() dto: PostToggleDTO,
  ) {
    const post = await this.postService.updatePost(query, user, dto);

    return fillObject(PostRDO, post);
  }

  @Delete(`${Path.Delete}/:${Property.PostID}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Deleted
  })
  async destroy(
    @Param(Property.PostID) param: PostIDDTO,
    @User() user: UserEntityDTO,
  ) {
    await this.postService.deletePost(param, user)
  }

  @Post(`${Path.Repost}/:${Property.PostID}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async repost(
    @Param() param: PostIDDTO,
    @User() user: UserEntityDTO,
  ) {
    const post = await this.postService.repost(param, user);

    return fillObject(PostRDO, post);
  }

  @Post(`${Path.Like}/:${Property.PostID}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async like(
    @Param() param: PostIDDTO,
    @User() user: UserEntityDTO,
  ) {
    const post = await this.postService.likePost(param, user);

    return fillObject(PostRDO, post);
  }

  @UseGuards(JwtAuthGuard)
  @Post(Path.Notify)
  async notify(
    @User() user: UserEntityDTO,
  ) {
    return await this.postService.notify(user)
  }

  @RMQRoute(RPC.GetPosts)
  async getPostsByUser(
    @User() user: UserEntityDTO,
  ) {
    return await (await this.postService.getPostsByUser(user)).map((post) => post.id)
  }
}
