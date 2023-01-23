import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiAuth, ApiCommonResponses, AppInfo, CommentIDDTO, CommentRDO, CommentTextDTO, Consumes, Entity, fillObject, Path, Prefix, RPC, User, UserAuthDTO, UserIDDTO} from '@readme/core';
import { FormDataRequest } from 'nestjs-form-data';
import { BffRpcService } from '../bff-rpc/bff-rpc.service';

@ApiTags(Prefix.Comments)
@Controller(Prefix.Comments)
export class BffCommentsController {
  constructor(
    private readonly bffRpcService: BffRpcService,
  ) {}

  @Post(Path.New)
  @ApiAuth(Entity.User)
  @ApiBody({ type:  CommentRDO})
  @ApiCommonResponses(Entity.User, {type: CommentRDO, description: `${Entity.Comment} ${AppInfo.Created}`})
  @ApiConsumes(Consumes.FormData)
  @FormDataRequest()
  async create(
    @User() user: UserAuthDTO,
    @Body() dto: CommentTextDTO,
    ) {
    const comment = await this.bffRpcService.send(RPC.AddComment, {user, dto})

    return fillObject(CommentRDO, comment);
  }

  @Delete(Path.Delete)
  @ApiConsumes(Consumes.FormData)
  @ApiAuth(Entity.User)
  @ApiQuery({ type: CommentIDDTO })
  async delete(
    @User() user: UserIDDTO,
    @Query() comment: CommentIDDTO,
    ) {
      await this.bffRpcService.send(RPC.DeleteComment, {user, comment})
  }
}
