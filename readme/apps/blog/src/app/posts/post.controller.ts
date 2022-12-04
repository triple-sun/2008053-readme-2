
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamName, fillObject, Path, Prefix } from '@readme/core';
import { PostService } from './post.service';
import { PostRDO } from './rdo/post.rdo'
import { PostCreateDTO, PostInfo } from '@readme/shared-types';
import { PostUpdateDTO } from './dto/post-update.dto';

class Ass<T> {
  bebra: T
}

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
  async show(@Param(ParamName.PostID) postID: string) {
    const post = await this.postService.getPost(parseInt(postID));

    console.log({PostController: post})

    return fillObject(PostRDO, post);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Loaded
  })
  async index() {
    return this.postService.getPosts()
  }

  @Post()
  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.CREATED,
    description: PostInfo.Created
  })
  async create(@Body() dto: PostCreateDTO) {
    const post = await this.postService.createPost(dto);

    console.log(post)

    return fillObject(PostRDO, post);
  }

  @Patch(Path.PostID)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Updated
  })
  async update(@Param(ParamName.PostID) postID: string, @Body() dto: PostUpdateDTO) {
    const post = await this.postService.updatePost(parseInt(postID), dto);

    console.log(post, new Ass<typeof post>)

    return fillObject(PostRDO, post);
  }

  @Delete(Path.PostID)
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Deleted
  })
  async destroy(@Param(ParamName.PostID) postID: string) {
    await this.postService.deletePost(parseInt(postID))

    return this.postService.getPosts()
  }

  @Post(`${Path.PostID}/${Path.Repost}`)
  @ApiResponse({
   type: PostRDO,
   status: HttpStatus.OK,
   description: PostInfo.Reposted
  })
  async repost(@Param(ParamName.PostID) postID: string) {
    const post = await this.postService.repost(parseInt(postID));

    return fillObject(PostRDO, post);
  }
}
