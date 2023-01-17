import { ContentType } from "@prisma/client";
import { CommentAPIDesc, CommentAPIExample } from "../../enum/comment.enum";
import { FieldName } from "../../enum/field-name.enum";
import { MinMax } from "../../enum/minmax.enum";
import { PostAPIDesc, PostAPIExample } from "../../enum/post.enum";
import { UserAPIExample } from "../../enum/users.enum";
import { getDescForPost } from "../../utils/desc.utils";

export const PostAPIProp = {
  PostID: {
    required: true,
    description: getDescForPost(FieldName.ID),
    example: PostAPIExample.ID,
  },
  Type: {
    required: true,
    enum: ContentType,
    description: getDescForPost(FieldName.Type),
    example: PostAPIExample.Type,
  },
  IsRepost: {
    default: false,
    description: PostAPIDesc.Repost,
    example: PostAPIExample.Bool
  },
  IsDraft: {
    default: false,
    description: PostAPIDesc.Draft,
    example: PostAPIExample.Bool
  },
  AuthorID: {
    description: getDescForPost(FieldName.AuthorID),
    example: UserAPIExample.ID
  },
  UserID: {
    description: getDescForPost(FieldName.UserID),
    example: UserAPIExample.ID
  },
  OriginID: {
    description: getDescForPost(FieldName.OriginID),
    example: PostAPIExample.ID
  },
  Tags: {
    maxItems: MinMax.TagsLimit,
    description: getDescForPost(FieldName.Tags),
    example: PostAPIExample.Tags,
  },
  Tag: {
    description: getDescForPost(FieldName.Tag),
    example: PostAPIExample.Tag,
  },
  Limit: {
    default: MinMax.PostsLimit,
    maximum: MinMax.PostsLimit,
    description: CommentAPIDesc.Limit,
    example: CommentAPIExample.ID
  }
}
