import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { fillObject, Prefix, User, Path, JwtAuthGuard, Consumes, Entity, UserAuthDTO, ApiAuth, CommentRDO, PostID, CommentsDTO, PostIDDTO, CommentCreateDTO, CommentIDDTO } from '@readme/core';

import { CommentService } from './comment.service';

@ApiTags(Prefix.Comments)
@Controller(Prefix.Comments)
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Get()
  @ApiAuth(Entity.Comment)
  @ApiQuery({ type: CommentRDO })
  async getComments(
    @Query() query: CommentsDTO
  ) {
    const comments = await this.commentService.getCommentsForPost(query)

    return comments.map((comment) => fillObject(CommentRDO, comment))
  }

  @Post()
  @ApiAuth(Entity.User)
  @ApiQuery({ type: PostIDDTO})
  async create(
    @User() user: UserAuthDTO,
    @Query() query: PostIDDTO,
    @Body() dto: CommentCreateDTO
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
    @User() user: UserAuthDTO
    ) {
    await this.commentService.deleteComment(dto, user);
  }
}
