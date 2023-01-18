import { IntersectionType } from '@nestjs/swagger';
import { PageQuery, PostIDQuery } from '@readme/core';

export class CommentListQuery extends IntersectionType(
  PostIDQuery,
  PageQuery
) {}
