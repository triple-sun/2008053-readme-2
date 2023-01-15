import { ContentType } from "@prisma/client";
import { Types } from "mongoose";
import { CommentAPIDesc, CommentAPIExample } from "../../enum/comment.enum";
import { FieldName } from "../../enum/field-name.enum";
import { MinMax } from "../../enum/minmax.enum";
import { PostAPIDesc, PostAPIExample } from "../../enum/post.enum";
import { UserAPIExample } from "../../enum/users.enum";
import { getDescForPost } from "../../utils/desc.utils";
import { TAPIProp } from "../api-prop";

export const PostAPIProp: TAPIProp = {
  [FieldName.PostID]: {
    required: true,
    description: getDescForPost(FieldName.ID),
    example: PostAPIExample.ID,
  },
  [FieldName.Type]: {
    required: true,
    enum: ContentType,
    description: getDescForPost(FieldName.Type),
    example: PostAPIExample.Type,
  },
  [FieldName.IsRepost]: {
    default: false,
    description: PostAPIDesc.Repost,
    example: PostAPIExample.Bool
  },
  [FieldName.IsDraft]: {
    default: false,
    description: PostAPIDesc.Draft,
    example: PostAPIExample.Bool
  },
  [FieldName.AuthorID]: {
    type: Types.ObjectId,
    description: getDescForPost(FieldName.AuthorID),
    example: UserAPIExample.ID
  },
  [FieldName.OriginID]: {
    description: getDescForPost(FieldName.OriginID),
    example: PostAPIExample.ID
  },
  [FieldName.Tags]: {
    maxItems: MinMax.TagsLimit,
    description: getDescForPost(FieldName.Tags),
    example: PostAPIExample.Tags,
  },
  [FieldName.Limit]: {
    default: MinMax.PostsLimit,
    maximum: MinMax.PostsLimit,
    description: CommentAPIDesc.Limit,
    example: CommentAPIExample.ID
  }
}
