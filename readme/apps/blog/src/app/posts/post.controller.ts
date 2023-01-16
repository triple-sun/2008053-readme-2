import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { fillObject, Prefix, PostInfo, Path, MongoIDValidationPipe, MinMax, getImageUploadPipe, PostCreateDTO, getStorageOptions, UploadType, handlePostDTO, FieldName, TagsValidationPipe, UserID, PostTypeParamValidationPipe, JwtAuthGuard, User } from '@readme/core';

import { PostService } from './post.service';
import { PostRDO } from './rdo/post.rdo';
import { PostsQuery } from './query/posts.query.dto';
import { ContentType } from '@prisma/client';
import { PostUpdateDTO } from './query/post-update.dto';
import { PostDeleteDTO } from './query/post-delete.dto';

@ApiTags(Prefix.Posts)
@Controller(Prefix.Posts)
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get(`:${FieldName.PostID}`)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Found
  })
  async show(
    @Param(FieldName.PostID) postID: number
  ) {
    const post = await this.postService.getPost(postID);

    return fillObject(PostRDO, post);
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getFeed(
    @UserID(MongoIDValidationPipe) userID: string,
    @Query() query: PostsQuery,
  ) {
    return this.postService.getFeed(userID, query)
  }

  @Get(`${Path.Tag}/:${FieldName.Tag}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByTag(
    @Param(FieldName.Tag) tag: string,
    @Query() query: PostsQuery,
  ) {
    return this.postService.getPostsByTag(query,tag)
  }

  @Get(`${Path.Type}/:${FieldName.Type}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByType(
    @Param(FieldName.Type, PostTypeParamValidationPipe) type: ContentType,
    @Query() query: PostsQuery,
  ) {
    return this.postService.getPostsByType(query, type)
  }

  @Get(`${Path.Users}/:${FieldName.AuthorID}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByAuthor(
    @Param(FieldName.AuthorID, MongoIDValidationPipe) authorID: string,
    @Query() query: PostsQuery,
  ) {
    return this.postService.getPostsByAuthor(query, authorID)
  }

  @Get(`${Path.Title}/:${FieldName.Title}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPostsByTitle(
    @Param(FieldName.Title) title: string,
    @Query() query: PostsQuery,
  ) {
    return this.postService.getPostsByTitle(query, title)
  }

  @Get(`${Path.Drafts}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getDrafts(
    @UserID(MongoIDValidationPipe) userID: string,
    @Query() query: PostsQuery,
  ) {
    return this.postService.getDrafts(query, userID)
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', getStorageOptions(UploadType.Photo))
  )
  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.CREATED,
    description: PostInfo.Created
  })
  async create(
    @UserID(MongoIDValidationPipe) userID: string,
    @Body(FieldName.Tags, TagsValidationPipe) rawDTO: PostCreateDTO,
    @UploadedFile(getImageUploadPipe(MinMax.Photo)) file: Express.Multer.File,
  ) {
    const dto = handlePostDTO<PostCreateDTO>(rawDTO, file.path)
    const post = await this.postService.createPost(userID, dto)

    return fillObject(PostRDO, post);
  }

  @Patch(Path.Update)
  @UseInterceptors(
    FileInterceptor('file', getStorageOptions(UploadType.Photo))
  )
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Updated
  })
  async update(
    @UserID(MongoIDValidationPipe) userID: string,
    @Body(FieldName.Tags, TagsValidationPipe) rawDTO: PostUpdateDTO,
    @UploadedFile(getImageUploadPipe(MinMax.Photo)) file: Express.Multer.File,
  ) {
    const dto = handlePostDTO<PostUpdateDTO>(rawDTO, file.path)
    const post = await this.postService.updatePost(userID, dto);

    return fillObject(PostRDO, post);
  }

  @Delete(Path.Delete)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Deleted
  })
  async destroy(
    @Body() dto: PostDeleteDTO,
    @UserID(MongoIDValidationPipe) userID: string,
  ) {
    await this.postService.deletePost(userID, dto)
  }

  @Post(`${Path.Repost}/:${FieldName.PostID}`)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async repost(
    @Param(FieldName.PostID) postID: number,
    @Query(FieldName.UserID) {userID}: User
  ) {
    const post = await this.postService.repost(postID, userID);

    return fillObject(PostRDO, post);
  }

  @Post(`${Path.Like}/:${FieldName.PostID}`)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async like(
    @Param(FieldName.PostID) postID: number,
    @UserID(MongoIDValidationPipe) userID: string,
  ) {
    const post = await this.postService.likePost(postID, userID);

    return fillObject(PostRDO, post);
  }

  @UseGuards(JwtAuthGuard)
  @Post(Path.Notify)
  async notify(
    @UserID(MongoIDValidationPipe) userID: string,
  ) {
    return this.postService.notify(userID)
  }
}
