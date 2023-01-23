import { Body, Controller, Delete, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiAuth, AppName, CommentCreateDTO, CommentIDDTO, CommentRDO, CommentTextDTO, Consumes, Entity, fillObject, JwtAuthGuard, Path, PostIDDTO, Prefix, RPC, User, UserAuthDTO, UserIDDTO} from '@readme/core';
import { IComment } from '@readme/shared-types';
import { RMQService } from 'nestjs-rmq';

@ApiTags(Prefix.Comments)
@Controller(AppName.BFF)
export class BffCommentsController {
  constructor(
    private readonly rmqService: RMQService,
  ) {}

  @Post()
  @ApiAuth(Entity.User)
  @ApiBody({ type:  CommentRDO})
  async create(
    @User() {userId}: UserAuthDTO,
    @Body() dto: CommentTextDTO,
    @Query() {postId}: PostIDDTO
    ) {
    const comment = await this.rmqService.send<CommentCreateDTO, IComment>(RPC.AddComment, {...dto, postId, userId})

    return fillObject(Comment, comment);
  }

  @Delete(`${Path.Delete}`)
  @UseGuards(JwtAuthGuard)
  @ApiConsumes(Consumes.FormData)
  @ApiBearerAuth()
  @ApiQuery({ type: CommentIDDTO })
  async delete(
    @Query() dto: CommentIDDTO,
    @User() user: UserIDDTO
    ) {
      await this.rmqService.notify<CommentIDDTO & UserIDDTO>(RPC.DeleteComment, {...dto, ...user})
  }
}
