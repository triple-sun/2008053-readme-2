import { IntersectionType, PickType } from "@nestjs/swagger";
import { PostIDQuery, User } from "@readme/core";

export class CommentCreateQuery extends IntersectionType(
  PostIDQuery,
  PickType(User, ['userID'] as const)
) {}
