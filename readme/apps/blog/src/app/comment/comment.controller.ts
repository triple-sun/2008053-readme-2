import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { fillObject, Prefix, User, Path, JwtAuthGuard, Consumes, Entity, UserAuthDTO, ApiAuth } from '@readme/core';
import { CommentDTO, CommentIDDTO, CommentRDO, CommentsDTO } from '../posts/dto/comment.dto';
import { PostIDDTO } from '../posts/dto/post/post.dto';

import { CommentService } from './comment.service';

@ApiTags(Prefix.Comments)
@Controller(Prefix.Comments)
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Get()
  @ApiAuth(Entity.Comment)
  @ApiQuery({ type: CommentsDTO })
  async getComments(
    @Query() query: CommentsDTO
  ) {
    const comments = await this.commentService.getCommentsForPost(query)

    return comments.map((comment) => fillObject(CommentRDO, comment))
  }

  @Post()
  @ApiAuth(Entity.User)
  @ApiQuery({ type: PostIDDTO })
  async create(
    @User() user: UserAuthDTO,
    @Query() query: PostIDDTO,
    @Body() dto: CommentDTO
    ) {
    const comment = await this.commentService.createComment(user, query, dto);

    return fillObject(CommentRDO, comment);
  }

  @Delete(`${Path.Delete}`)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @ApiBearerAuth()
  @ApiQuery({ type: PostIDDTO })
  async delete(
    @Query() dto: CommentIDDTO,
    @User() userID: string
    ) {
    await this.commentService.deleteComment(dto, userID);
  }
}
