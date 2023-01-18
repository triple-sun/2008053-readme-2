import { CommentAPIDesc, CommentAPIExample } from "../../enum/comment.enum";
import { FieldName } from "../../enum/field-name.enum";
import { MinMax } from "../../enum/minmax.enum";
import { getDescForComment } from "../../utils/desc.utils";
import { TAPIProp } from "../api-prop";

export const CommentAPIProp: TAPIProp = {
  [FieldName.ID]: {
    description: getDescForComment(FieldName.ID),
    example: CommentAPIExample.ID
  },
  [FieldName.Text]: {
    required: true,
    description: getDescForComment(FieldName.Text),
    example: CommentAPIExample.Text,
    minLength: MinMax.CommentMin,
    maxLength: MinMax.CommentMax
  },
  [FieldName.Limit]: {
    default: MinMax.CommentsLimit,
    maximum: MinMax.CommentsLimit,
    description: CommentAPIDesc.Limit,
    example: CommentAPIExample.ID
  }
}
