import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, Prefix, CommentInfo, User, Path, JwtAuthGuard, Property, UserEntityDTO } from '@readme/core';
import { CommentDTO, CommentRDO, CommentsDTO } from '../posts/dto/comment.dto';
import { PostIDDTO } from '../posts/dto/post/post.dto';

import { CommentService } from './comment.service';

@ApiTags(Prefix.Comments)
@Controller(Prefix.Comments)
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentInfo.Loaded
  })
  async getComments(
    @Query() query: CommentsDTO
  ) {
    const comments = await this.commentService.getCommentsForPost(query)

    return comments.map((comment) => fillObject(CommentRDO, comment))
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: [CommentRDO],
    status: HttpStatus.CREATED,
    description: CommentInfo.Created
  })
  async create(
    @User() user: UserEntityDTO,
    @Query() query: PostIDDTO,
    @Body() dto: CommentDTO
    ) {
    const comment = await this.commentService.createComment(user, query, dto);

    return fillObject(CommentRDO, comment);
  }

  @Delete(`${Path.Delete}/:${Property.CommentID}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
   status: HttpStatus.OK,
   description: CommentInfo.Deleted
  })
  async delete(
    @Param(Property.CommentID) commentID: number,
    @User() userID: string
    ) {
    await this.commentService.deleteComment(commentID, userID);
  }
}
