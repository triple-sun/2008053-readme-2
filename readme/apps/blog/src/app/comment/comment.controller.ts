
import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamName, fillObject, Path, Prefix, User, KeyName } from '@readme/core';
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
  async getComments(@Param(ParamName.PostID) postID: string) {
    return this.commentService.findAllByPostID(postID)
  }

  @Post(`${Path.PostID}`)
  @ApiResponse({
    type: CommentRDO,
    status: HttpStatus.CREATED,
    description: CommentInfo.Created
  })
  async create(@Param(ParamName.PostID) postID: string, @User(KeyName.ID) userID: string, @Body() {text}: CommentCreateDTO) {
    const comment = await this.commentService.create({text, postID, userID});

    return fillObject(CommentRDO, comment);
  }

  @Delete(`${Path.PostID}/${Path.CommentID}`)
  @ApiResponse({
   status: HttpStatus.OK,
   description: CommentInfo.Deleted
  })
  async delete(@Param(ParamName.CommentID) commentID: string, @User(KeyName.ID) userID: string) {
    return this.commentService.delete(commentID, userID);
  }
}
