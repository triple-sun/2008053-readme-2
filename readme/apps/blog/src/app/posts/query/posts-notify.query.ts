import { IntersectionType } from "@nestjs/swagger";
import { EmailQuery, UserIDQuery } from "@readme/core";

export class PostsNotifyQuery extends IntersectionType(
  EmailQuery,
  UserIDQuery
) {}
