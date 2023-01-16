import { IntersectionType } from "@nestjs/swagger";
import { PostIDQuery } from "../query/post-id.query";
import { UserIDQuery } from "../query/user-id.query";

export class UpdateUserPostsMsg extends IntersectionType(
  UserIDQuery,
  PostIDQuery
) {}
