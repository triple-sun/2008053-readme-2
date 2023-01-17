import { MinMax } from "../../enum/minmax.enum";
import { UserAPIDesc, UserAPIExample } from "../../enum/users.enum";

export const UsersAPIProp = {
  Email: {
    required: true,
    description: UserAPIDesc.Email,
    example: UserAPIExample.Email
  },
  Name: {
    required: true,
    description: UserAPIDesc.Name,
    example: UserAPIExample.Name,
    maxLength: MinMax.UserNameMax,
    minLength: MinMax.UserNameMin
  },
  UserID: {
    required: true,
    description: UserAPIDesc.ID,
    example: UserAPIExample.ID,
  },
  SubToID: {
    required: true,
    description: UserAPIDesc.SubTo,
    example: UserAPIExample.ID,
  },
  Posts: {
    required: true,
    description: UserAPIDesc.PostIDs,
    example: UserAPIExample.PostIDs
  },
  Token: {
    description: UserAPIDesc.Token,
    example: UserAPIExample.Token
  },
  Subscribers: {
    description: UserAPIDesc.Subscribers,
    example: UserAPIExample.Subscribers
  },
  Password: {
    description: UserAPIDesc.Pass,
    example: UserAPIExample.Pass,
    maxLength: MinMax.UserPassMax,
    minLength: MinMax.UserPassMin
  },
  AvatarUrl: {
    description: UserAPIDesc.AvatarUrl,
    example: UserAPIExample.FilePath
  }
}
