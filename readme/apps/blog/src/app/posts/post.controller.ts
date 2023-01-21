import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';

import { fillObject, Prefix, PostInfo, Path, PostCreateDTO, Property, UserData, JwtAuthGuard, PostRDO, MongoIDValidationPipe, RPC, PostTypeDTO, NameDTO, TagDTO, AuthorIDDTO, TitleDTO, PostIDDTO, mapPosts } from '@readme/core';

import { PostService } from './post.service';
import { PostsQueryDTO } from './query/posts.query.dto';
import { PostUpdateDTO } from './query/post-update.dto';
import { RMQRoute } from 'nestjs-rmq';
import { ContentType } from '@prisma/client';

const { Tag: TagDTO, PostID, AuthorID, Title  } = Property

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
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPosts(query)

    return mapPosts(posts)
  }

  @Get(`${Path.Feed}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: PostInfo.Loaded })
  async getFeed(
    @UserData() dto: NameDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getFeed(dto, query)

    return mapPosts(posts)
  }

  @Get(`${Path.Tag}/:${TagDTO}`)
  @ApiResponse({ status: HttpStatus.OK, description: PostInfo.Loaded })
  async getPostsByTag(
    @Param() dto: TagDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPostsByTag(dto, query)

    return mapPosts(posts)
  }

  @Get(`${Path.Type}`)
  @ApiQuery({enum: ContentType})
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByType(
    @Query() dto: PostTypeDTO,
    @Query() query: PostsQueryDTO,
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
    @Param(AuthorID, MongoIDValidationPipe) dto: AuthorIDDTO,
    @Query() query: PostsQueryDTO,
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
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getPostsByTitle(dto, query)

    return mapPosts(posts)
  }

  @Get(`${Path.Drafts}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: PostInfo.Loaded })
  async getDrafts(
    @UserData() user: NameDTO,
    @Query() query: PostsQueryDTO,
  ) {
    const posts = await this.postService.getDrafts(user, query)

    return mapPosts(posts)
  }

  @Post(`${Path.New}`)
  @UseGuards(JwtAuthGuard)
  @ApiQuery({enum: ContentType})
  @FormDataRequest()
  @ApiResponse({ type: PostRDO, status: HttpStatus.CREATED, description: PostInfo.Created })
  async create(
    @UserData() user: NameDTO,
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
    @UserData() user: NameDTO,
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
    @UserData() user: NameDTO,
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
    @UserData() user: NameDTO,
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
    @UserData() user: NameDTO,
  ) {
    const post = await this.postService.likePost(param, user);

    return fillObject(PostRDO, post);
  }

  @UseGuards(JwtAuthGuard)
  @Post(Path.Notify)
  async notify(
    @UserData() user: NameDTO,
  ) {
    return await this.postService.notify(user)
  }

  @RMQRoute(RPC.GetPosts)
  async getPostsByUser(
    @UserData() user: NameDTO,
  ) {
    return (await this.postService.getPostsByUser(user)).length
  }
}
