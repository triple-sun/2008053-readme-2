import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, Prefix, CommentInfo, UserData, Path, JwtAuthGuard, Property, NameDTO } from '@readme/core';

import { CommentService } from './comment.service';
import { CommentCreateDTO } from './dto/comment-create.dto';
import { CommentCreateDTO } from './query/comment-create.dto';
import { CommentsDTO } from './query/comments.dto';
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
    @UserData() user: NameDTO,
    @Query() query: CommentCreateDTO,
    @Body() dto: CommentCreateDTO
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
    @UserData() userID: string
    ) {
    await this.commentService.deleteComment(commentID, userID);
  }
}
