import { EEntity } from "./enum/model.enum";
import { EProperty } from "./enum/property.enum";
import { ErrorMessage } from "./error.const";

const { ID, Email} = EProperty

const {User, Comment, Post} = {
  User: {
    Email: {entity: EEntity.User, property: Email},
    ID: {entity: EEntity.User, property: ID}
  },
  Comment: {entity: EEntity.Comment, property: ID},
  Post: {entity: EEntity.Post, property: ID}
}

export const AppError = {
  ENV: ErrorMessage.ENV,
  Length: ErrorMessage.Length,
  Core: ErrorMessage.Common,
  User: {
    Email: {
      Exists: ErrorMessage.Exists(User.Email),
      NotFound: ErrorMessage.NotFound(User.Email),
      Invalid: ErrorMessage.Invalid(User.Email)
    },
    ID: {
      Exists: ErrorMessage.Exists(User.ID),
      NotFound: ErrorMessage.NotFound(User.ID),
      Invalid: ErrorMessage.Invalid(User.ID),
      Permission: ErrorMessage.Permission(User.ID)
    }
  },
  Comment: {
    Permission: ErrorMessage.Permission(Comment),
    NotFound: ErrorMessage.NotFound(Comment),
    Invalid: ErrorMessage.Invalid(Comment)
  },
  Post: {
    Permission: ErrorMessage.Permission(Post),
    NotFound: ErrorMessage.NotFound(Post),
    Invalid: ErrorMessage.Invalid(Post)
  }
}
