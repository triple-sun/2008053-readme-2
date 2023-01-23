import { Body, Controller, Query} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Prefix, User, PostIDDTO, CommentCreateDTO, CommentIDDTO, RPC, UserAuthDTO } from '@readme/core';

import { CommentService } from './comment.service';

@ApiTags(Prefix.Comments)
@Controller(Prefix.Comments)
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @MessagePattern(RPC.AddComment)
  async create(
    @User() user: UserAuthDTO,
    @Query() query: PostIDDTO,
    @Body() dto: CommentCreateDTO
    ) {
    return await this.commentService.createComment(user, query, dto);
  }

  @MessagePattern(RPC.DeleteComment)
  async delete(
    @Query() dto: CommentIDDTO,
    @User() user: UserAuthDTO
    ) {
    return await this.commentService.deleteComment(dto, user);
  }
}
