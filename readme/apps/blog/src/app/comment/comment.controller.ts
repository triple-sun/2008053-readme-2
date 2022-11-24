
import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamName, fillObject, Path, Prefix, User } from '@readme/core';
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

  @Get(`${Path.ID}`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentInfo.Loaded
  })
  async getComments(@Param(ParamName.ID) postID: string) {
    return this.commentService.findAllByPostID(postID)
  }

  @Post(`${Path.ID}`)
  @ApiResponse({
    type: CommentRDO,
    status: HttpStatus.CREATED,
    description: CommentInfo.Created
  })
  async create(@Param(ParamName.ID) postID: string, @Body() dto: CommentCreateDTO, @User(ParamName.ID) userID: string) {
    const comment = await this.commentService.create({...dto, postID, userID});

    return fillObject(CommentRDO, comment);
  }

  @Delete(`${Path.ID}`)
  @ApiResponse({
   status: HttpStatus.OK,
   description: CommentInfo.Deleted
  })
  async delete(@Body() commentID: string, @User(ParamName.ID) userID: string) {
    return this.commentService.delete(commentID, userID);
  }
}
