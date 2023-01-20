import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';

import { fillObject, Prefix, PostInfo, Path, PostCreateDTO, Property, User, JwtAuthGuard, PostRDO, MongoIDValidationPipe, RPC, PostTypeDTO, UserDTO, PostTagDTO, PostAuthorIDDTO, TitleDTO, PostIDDTO, APIOption, mapPosts } from '@readme/core';

import { PostService } from './post.service';
import { PostsQuery } from './query/posts.query.dto';
import { PostUpdateDTO } from './query/post-update.dto';
import { RMQRoute } from 'nestjs-rmq';

const { Tag, PostID, Type, AuthorID, Title  } = Property

@ApiTags(Prefix.Posts)
@Controller(Prefix.Posts)
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get(`${Path.Post}/:${PostID}`)
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
    @Query() query: PostsQuery,
  ) {
    const posts = await this.postService.getPosts(query)

    return mapPosts(posts)
  }

  @Get(`${Path.Feed}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: PostInfo.Loaded })
  async getFeed(
    @User() dto: UserDTO,
    @Query() query: PostsQuery,
  ) {
    const posts = await this.postService.getFeed(dto, query)

    return mapPosts(posts)
  }

  @Get(`${Path.Tag}/:${Tag}`)
  @ApiResponse({ status: HttpStatus.OK, description: PostInfo.Loaded })
  async getPostsByTag(
    @Param() dto: PostTagDTO,
    @Query() query: PostsQuery,
  ) {
    const posts = await this.postService.getPostsByTag(dto, query)

    return mapPosts(posts)
  }

  @Get(`${Path.Type}`)
  @ApiQuery(APIOption.Post(Type))
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByType(
    @Query() dto: PostTypeDTO,
    @Query() query: PostsQuery,
  ) {
    const posts = await this.postService.getPostsByType(dto, query)

    return mapPosts(posts)
  }

  @Get(`${Path.Users}/:${AuthorID}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByAuthor(
    @Param(AuthorID, MongoIDValidationPipe) dto: PostAuthorIDDTO,
    @Query() query: PostsQuery,
  ) {
    const posts = await this.postService.getPostsByAuthor(dto, query)

    return mapPosts(posts)
  }

  @Get(`${Path.Title}/:${Title}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByTitle(
    @Param() dto: TitleDTO,
    @Query() query: PostsQuery,
  ) {
    const posts = await this.postService.getPostsByTitle(dto, query)

    return mapPosts(posts)
  }

  @Get(`${Path.Drafts}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: PostInfo.Loaded })
  async getDrafts(
    @User() user: UserDTO,
    @Query() query: PostsQuery,
  ) {
    const posts = await this.postService.getDrafts(user, query)

    return mapPosts(posts)
  }

  @Post(`${Path.New}`)
  @UseGuards(JwtAuthGuard)
  @ApiQuery(APIOption.Post(Type))
  @FormDataRequest()
  @ApiResponse({ type: PostRDO, status: HttpStatus.CREATED, description: PostInfo.Created })
  async create(
    @User() user: UserDTO,
    @Body() dto: PostCreateDTO,
    @Query() query: PostTypeDTO
  ) {
    const post = await this.postService.createPost(user, query, dto)

    return fillObject(PostRDO, post);
  }

  @Patch(`${Path.Update}/:${PostID}`)
  @UseGuards(JwtAuthGuard)
  @FormDataRequest()
  @ApiResponse({ type: PostRDO, status: HttpStatus.OK, description: PostInfo.Updated })
  async update(
    @Query() query: PostIDDTO,
    @User() user: UserDTO,
    @Body() dto: PostUpdateDTO,
  ) {
    const post = await this.postService.updatePost(query, user, dto);

    return fillObject(PostRDO, post);
  }

  @Delete(`${Path.Delete}/:${PostID}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Deleted
  })
  async destroy(
    @Param(Property.PostID) param: PostIDDTO,
    @User() user: UserDTO,
  ) {
    await this.postService.deletePost(param, user)
  }

  @Post(`${Path.Repost}/:${PostID}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async repost(
    @Param() param: PostIDDTO,
    @User() user: UserDTO,
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
    @User() user: UserDTO,
  ) {
    const post = await this.postService.likePost(param, user);

    return fillObject(PostRDO, post);
  }

  @UseGuards(JwtAuthGuard)
  @Post(Path.Notify)
  async notify(
    @User() user: UserDTO,
  ) {
    return await this.postService.notify(user)
  }

  @RMQRoute(RPC.GetPosts)
  async getPostsByUser(
    @User() user: UserDTO,
  ) {
    return (await this.postService.getPostsByUser(user)).length
  }
}
