import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { fillObject, Prefix, PostInfo, Path, MongoIDValidationPipe, UserIDQuery, MinMax, getImageUploadPipe, PostCreateDTO, getStorageOptions, UploadType, handlePostDTO, FieldName, TagsValidationPipe, PostUpdateDTO } from '@readme/core';

import { PostService } from './post.service';
import { PostFeedQuery } from './query/post-feed.query';
import { PostsNotifyQuery } from './query/posts-notify.query';
import { PostRDO } from './rdo/post.rdo';

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
  async index(
    @Query() query: PostFeedQuery,
  ) {
    return this.postService.getPosts(query)
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
    @Query(FieldName.UserID, MongoIDValidationPipe) query: UserIDQuery,
    @Body(FieldName.Tags, TagsValidationPipe) rawDTO: PostCreateDTO,
    @UploadedFile(getImageUploadPipe(MinMax.PhotoMaxBytes)) file: Express.Multer.File,
  ) {
    const dto = handlePostDTO<PostCreateDTO>(rawDTO, file.path)
    const post = this.postService.createPost(query, dto)

    return fillObject(PostRDO, post);
  }

  @Patch(`:${FieldName.PostID}`)
  @UseInterceptors(
    FileInterceptor('file', getStorageOptions(UploadType.Photo))
  )
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Updated
  })
  async update(
    @Param(FieldName.PostID) postID: number,
    @Query(FieldName.UserID, MongoIDValidationPipe) query: UserIDQuery,
    @Body(FieldName.Tags, TagsValidationPipe) rawDTO: PostUpdateDTO,
    @UploadedFile(getImageUploadPipe(MinMax.PhotoMaxBytes)) file: Express.Multer.File,
  ) {
    const dto = handlePostDTO<PostUpdateDTO>(rawDTO, file.path)
    const post = await this.postService.updatePost(postID, query, dto);

    return fillObject(PostRDO, post);
  }

  @Delete(`:${FieldName.PostID}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Deleted
  })
  async destroy(
    @Param(FieldName.PostID) postID: number,
    @Query(FieldName.UserID, MongoIDValidationPipe) {userID}: UserIDQuery
  ) {
    await this.postService.deletePost(postID, userID)
  }

  @Post(`:${FieldName.PostID}/repost`)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async repost(
    @Param(FieldName.PostID) postID: number,
    @Query(FieldName.UserID, MongoIDValidationPipe) {userID}: UserIDQuery
  ) {
    const post = await this.postService.repost(postID, userID);

    return fillObject(PostRDO, post);
  }

  @Post(`:${FieldName.PostID}/like`)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async like(
    @Param(FieldName.PostID) postID: number,
    @Query(FieldName.UserID, MongoIDValidationPipe) query: UserIDQuery
  ) {
    const post = await this.postService.likePost(postID, query);

    return fillObject(PostRDO, post);
  }

  @Get(Path.SendNewPosts)
  async sendNew(
    @Query() query: PostsNotifyQuery,
  ) {
    return this.postService.notify(query)
  }
}
