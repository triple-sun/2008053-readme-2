import { Types } from "mongoose";
import { FieldName } from "../../enum/field-name.enum";
import { MinMax } from "../../enum/minmax.enum";
import { UserAPIDesc, UserAPIExample } from "../../enum/users.enum";
import { TAPIProp } from "../api-prop";

export const UsersAPIProp: TAPIProp = {
  [FieldName.Email]: {
    required: true,
    description: UserAPIDesc.Email,
    example: UserAPIExample.Email
  },
  [FieldName.Name]: {
    required: true,
    description: UserAPIDesc.Name,
    example: UserAPIExample.Name,
    maxLength: MinMax.UserNameMax,
    minLength: MinMax.UserNameMin
  },
  [FieldName.UserID]: {
    required: true,
    type: Types.ObjectId,
    description: UserAPIDesc.ID,
    example: UserAPIExample.ID,
  },
  [FieldName.SubToID]: {
    required: true,
    type: Types.ObjectId,
    description: UserAPIDesc.SubTo,
    example: UserAPIExample.ID,
  },
  [FieldName.Posts]: {
    required: true,
    description: UserAPIDesc.PostIDs,
    example: UserAPIExample.PostIDs
  },
  [FieldName.Token]: {
    description: UserAPIDesc.Token,
    example: UserAPIExample.Token
  },
  [FieldName.Subscribers]: {
    type: [Types.ObjectId],
    description: UserAPIDesc.Subscribers,
    example: UserAPIExample.Subscribers
  },
  [FieldName.Password]: {
    description: UserAPIDesc.Pass,
    example: UserAPIExample.Pass,
    maxLength: MinMax.UserPassMax,
    minLength: MinMax.UserPassMin
  },
  [FieldName.AvatarUrl]: {
    description: UserAPIDesc.AvatarUrl,
    example: UserAPIExample.FilePath
  }
}
