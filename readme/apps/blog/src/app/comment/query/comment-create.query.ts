import { IntersectionType } from "@nestjs/swagger";
import { PostIDQuery, UserIDQuery } from "@readme/core";

export class CommentCreateQuery extends IntersectionType(
  PostIDQuery,
  UserIDQuery
) {}
