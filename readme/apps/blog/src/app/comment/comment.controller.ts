
import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamName, fillObject, Path, Prefix, User } from '@readme/core';
import { CommentInfo } from './comment.enum';
import { CommentService } from './comment.service';
import { CommentCreateDTO } from './dto/comment-create.dto';
import { CommentFeedRDO } from './rdo/comment-feed.rdo';
import { CommentRDO } from './rdo/comment.rdo';

@ApiTags(Prefix.Comment)
@Controller(Prefix.Comment)
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Post(`${Path.ID}/${Path.Comments}`)
  @ApiResponse({
    type: CommentRDO,
    status: HttpStatus.CREATED,
    description: CommentInfo.Created
  })
  async create(@Param(ParamName.ID) postID: string, @Body() dto: CommentCreateDTO, @User(ParamName.ID) userID: string) {
    const comment = await this.commentService.create({...dto, postID, userID});

    return fillObject(CommentRDO, comment);
  }

  @Get(`${Path.ID}/${Path.Comments}`)
  @ApiResponse({
    type: CommentFeedRDO,
    status: HttpStatus.OK,
    description: CommentInfo.Loaded
  })
  async findAll(@Param(ParamName.ID) postID: string) {
  return this.commentService.findAllByPostID(postID)
}

  @Delete(`${Path.ID}/${Path.Comments}`)
  @ApiResponse({
   status: HttpStatus.OK,
   description: CommentInfo.Deleted
  })
  async delete(@Param(ParamName.ID) commentID: string, @User(ParamName.ID) userID: string) {
    return this.commentService.delete(commentID, userID);
  }
}
