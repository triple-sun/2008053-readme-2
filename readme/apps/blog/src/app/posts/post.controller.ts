import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';

import { fillObject, Prefix, PostInfo, Path, PostCreateDTO, Property, UserID, JwtAuthGuard, PostBaseRDO, fillPostRDO, MongoIDValidationPipe, RPC, PostTypeDTO } from '@readme/core';

import { PostService } from './post.service';
import { PostsQuery } from './query/posts.query.dto';
import { PostUpdateDTO } from './query/post-update.dto';
import { RMQRoute } from 'nestjs-rmq';

@ApiTags(Prefix.Posts)
@Controller(Prefix.Posts)
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get(`${Path.Post}/:${Property
.PostID}`)
  @ApiResponse({
   status: HttpStatus.OK,
   description: PostInfo.Found
  })
  async show(
    @Param(Property
  .PostID) postID: number
  ) {
    const post = await this.postService.getPost(postID);

    return fillPostRDO(post)
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getAllPosts(
    @Query() query: PostsQuery,
  ) {
    return this.postService.getPosts(query)
  }

  @Get(`${Path.Feed}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getFeed(
    @UserID() userID: string,
    @Query() query: PostsQuery,
  ) {
    console.log({userID}, {query})
    return this.postService.getFeed(userID, query)
  }

  @Get(`${Path.Tag}/:${Property
.Tag}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByTag(
    @Param(Property
  .Tag) tag: string,
    @Query() query: PostsQuery,
  ) {
    return this.postService.getPostsByTag(query, tag)
  }

  @Get(`${Path.Type}/:${Property
.Type}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByType(
    @Param() {type}: PostTypeDTO,
    @Query() query: PostsQuery,
  ) {
    return this.postService.getPostsByType(query, type)
  }

  @Get(`${Path.Users}/:${Property
.AuthorID}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByAuthor(
    @Param(Property
  .AuthorID, MongoIDValidationPipe) authorID: string,
    @Query() query: PostsQuery,
  ) {
    return this.postService.getPostsByAuthor(query, authorID)
  }

  @Get(`${Path.Title}/:${Property
.Title}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByTitle(
    @Param(Property
  .Title) title: string,
    @Query() query: PostsQuery,
  ) {
    return this.postService.getPostsByTitle(query, title)
  }

  @Get(`${Path.Drafts}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getDrafts(
    @UserID() userID: string,
    @Query() query: PostsQuery,
  ) {
    return this.postService.getDrafts(query, userID)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @FormDataRequest()
  @ApiResponse({
    type: PostBaseRDO,
    status: HttpStatus.CREATED,
    description: PostInfo.Created
  })
  async create(
    @UserID() userID: string,
    @Body() dto: PostCreateDTO,
  ) {
    console.log({dto})
    const post = await this.postService.createPost(userID, dto)


    return fillObject(PostBaseRDO, post);
  }

  @Patch(`${Path.Update}/:${Property
.PostID}`)
  @UseGuards(JwtAuthGuard)
  @FormDataRequest()
  @ApiResponse({
   type: PostBaseRDO,
   status: HttpStatus.OK,
   description: PostInfo.Updated
  })
  async update(
    @Param(Property
  .PostID) postID: number,
    @UserID() userID: string,
    @Body() dto: PostUpdateDTO,
  ) {
    console.log({dto})
    const post = await this.postService.updatePost(userID, postID, dto);

    return fillObject(PostBaseRDO, post);
  }

  @Delete(`${Path.Delete}/:${Property
.PostID}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Deleted
  })
  async destroy(
    @Param(Property
  .PostID) postID: number,
    @UserID() userID: string,
  ) {
    await this.postService.deletePost(userID, postID)
  }

  @Post(`${Path.Repost}/:${Property
.PostID}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
   type: PostBaseRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async repost(
    @Param(Property
  .PostID) postID: number,
    @UserID() userID: string,
  ) {
    const post = await this.postService.repost(postID, userID);

    return fillObject(PostBaseRDO, post);
  }

  @Post(`${Path.Like}/:${Property
.PostID}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
   type: PostBaseRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async like(
    @Param(Property
  .PostID) postID: number,
    @UserID() userID: string,
  ) {
    const post = await this.postService.likePost(postID, userID);

    return fillObject(PostBaseRDO, post);
  }

  @UseGuards(JwtAuthGuard)
  @Post(Path.Notify)
  async notify(
    @UserID() userID: string,
  ) {
    return await this.postService.notify(userID)
  }

  @RMQRoute(RPC.GetPosts)
  async getPostsByUser(
    @UserID() userID: string,
  ) {
    return (await this.postService.getPostsByUser(userID)).length
  }
}
