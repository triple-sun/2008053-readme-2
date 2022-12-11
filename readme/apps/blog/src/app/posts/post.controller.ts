
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamName, fillObject, Path, Prefix } from '@readme/core';
import { PostService } from './post.service';
import { PostRDO } from './rdo/post.rdo'
import { PostCreateDTO, PostInfo } from '@readme/shared-types';
import { PostUpdateDTO } from './dto/post-update.dto';
import { PostQuery } from './query/post.query';

@ApiTags(Prefix.Posts)
@Controller(Prefix.Posts)
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get(Path.PostID)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Found
  })
  async show(@Param(ParamName.PostID) postID: number) {
    const post = await this.postService.getPost(postID);

    return fillObject(PostRDO, post);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async index(@Query() query: PostQuery) {
    return this.postService.getPosts(query)
  }

  @Post()
  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.CREATED,
    description: PostInfo.Created
  })
  async create(@Body() dto: PostCreateDTO) {
    const post = await this.postService.createPost(dto);

    return fillObject(PostRDO, post);
  }

  @Patch(Path.PostID)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Updated
  })
  async update(@Param(ParamName.PostID) postID: number, @Body() dto: PostUpdateDTO) {
    const post = await this.postService.updatePost(postID, dto);

    return fillObject(PostRDO, post);
  }

  @Delete(Path.PostID)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Deleted
  })
  async destroy(@Param(ParamName.PostID) postID: number) {
    await this.postService.deletePost(postID)
    }

  @Post(`${Path.PostID}/${Path.Repost}`)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async repost(@Param(ParamName.PostID) postID: number) {
    const post = await this.postService.repost(postID);

    return fillObject(PostRDO, post);
  }

  @Post(`${Path.PostID}/like`)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async like(@Param(ParamName.PostID) postID: number, @Body() dto: PostUpdateDTO) {
    const post = await this.postService.likePost(postID, dto);

    return fillObject(PostRDO, post);
  }
}
