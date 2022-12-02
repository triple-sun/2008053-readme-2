
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamName, fillObject, Path, Prefix, User } from '@readme/core';
import { PostCreateDTO } from './dto/post-create.dto';
import { PostInfo } from './post.enum';
import { PostService } from './post.service';
import { PostRDO } from './rdo/post.rdo'
import { PostUpdateDTO } from './dto/post-update.dto';

@ApiTags(Prefix.Posts)
@Controller(Prefix.Posts)
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async getPosts() {
    return this.postService.findAll()
  }

  @Post()
  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.CREATED,
    description: PostInfo.Created
  })
  async createPost(@Body() dto: PostCreateDTO) {
    const post = await this.postService.create(dto);

    return fillObject(PostRDO, post);
  }

  @Get(Path.PostID)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Found
  })
  async showPost(@Param(ParamName.PostID) postID: string) {
    const post = await this.postService.getPost(postID);

    console.log({PostController: post})

    return fillObject(PostRDO, post);
  }

  @Patch(Path.PostID)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Updated
  })
  async updatePost(@Param(ParamName.PostID) postID: string, @Body() dto: PostUpdateDTO) {
    const post = await this.postService.update(postID, dto);

    return fillObject(PostRDO, post);
  }

  @Delete(Path.PostID)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Deleted
  })
  async deletePost(@Param(ParamName.PostID) postID: string) {
    await this.postService.delete(postID)

    return this.postService.findAll()
  }

  @Post(`${Path.PostID}/${Path.Repost}`)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async repost(@Param(ParamName.PostID) postID: string) {
    const post = await this.postService.repost(postID);

    return fillObject(PostRDO, post);
  }
}
