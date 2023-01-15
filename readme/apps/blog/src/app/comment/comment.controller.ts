import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FieldName, fillObject, Prefix, CommentInfo } from '@readme/core';

import { CommentService } from './comment.service';
import { CommentCreateDTO } from './dto/comment-create.dto';
import { CommentCreateQuery } from './query/comment-create.query';
import { CommentListQuery } from './query/comment-list.query';
import { CommentRDO } from './rdo/comment.rdo';

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
    @Query() query: CommentListQuery
  ) {
    const comments = await this.commentService.getCommentsForPost(query)

    return comments.map((comment) => fillObject(CommentRDO, comment))
  }

  @Post()
  @ApiResponse({
    type: [CommentRDO],
    status: HttpStatus.CREATED,
    description: CommentInfo.Created
  })
  async create(
    @Query() {postID, userID}: CommentCreateQuery,
    @Body() dto: CommentCreateDTO
    ) {
    const comment = await this.commentService.createComment(postID, userID, dto);

    return fillObject(CommentRDO, comment);
  }

  @Delete(`:${FieldName.CommentID}`)
  @ApiResponse({
   status: HttpStatus.OK,
   description: CommentInfo.Deleted
  })
  async delete(@Param(FieldName.CommentID) commentID: number) {
    return this.commentService.deleteComment(commentID);
  }
}
