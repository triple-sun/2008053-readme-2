
import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamName, fillObject, Path, Prefix } from '@readme/core';
import { CommentInfo } from './comment.enum';
import { CommentService } from './comment.service';
import { CommentCreateDTO } from './dto/comment-create.dto';
import { CommentRDO } from './rdo/comment.rdo';

@ApiTags(Prefix.Comments)
@Controller(Prefix.Comments)
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Get(`${Path.PostID}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentInfo.Loaded
  })
  async getComments(@Param(ParamName.PostID) postID: number) {
    return this.commentService.getCommentsForPost(postID)
  }

  @Post(`${Path.PostID}`)
  @ApiResponse({
    type: [CommentRDO],
    status: HttpStatus.CREATED,
    description: CommentInfo.Created
  })
  async create(
    @Param(ParamName.PostID) postID: number,
    @Body() dto: CommentCreateDTO
    ) {
    const comment = await this.commentService.createComment(postID, dto);

    return fillObject(CommentRDO, comment);
  }

  @Delete(`${Path.CommentID}`)
  @ApiResponse({
   status: HttpStatus.OK,
   description: CommentInfo.Deleted
  })
  async delete(@Param(ParamName.CommentID) commentID: number) {
    return this.commentService.deleteComment(commentID);
  }
}
