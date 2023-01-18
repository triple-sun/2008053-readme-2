import { ValidationArguments } from "class-validator";
import { CommentError } from "../enum/comment.enum";
import { ErrorSuffix } from "../enum/core-error.enum";
import { FieldName } from "../enum/field-name.enum";
import { PostError } from "../enum/post.enum";
import { EntityName } from "../enum/utils.enum";

const getErrorMessage = (entity: EntityName, value: string | number, suffix: ErrorSuffix, property?: string) => `${entity} ${ property ? `with ${property}`: ''} ${value} ${suffix}`

export const ErrorMessage = {
  Comment: {
      NotFound: (id: number) => getErrorMessage(EntityName.Comment, id, ErrorSuffix.NotFound, FieldName.ID),
      Exists: (id: number) => getErrorMessage(EntityName.Comment, id, ErrorSuffix.Exists, FieldName.ID),
      Forbidden: CommentError.Permission
  },
  Post: {
      NotFound: (id: number) => getErrorMessage(EntityName.Post, id, ErrorSuffix.NotFound, FieldName.ID),
      Exists: (id: number) => getErrorMessage(EntityName.Post, id, ErrorSuffix.Exists, FieldName.ID),
      Forbidden: PostError.Permission
  },
  Sub: {
    NotFound: (value: string, property?: string) => getErrorMessage(EntityName.Subscriber, value, ErrorSuffix.NotFound, property),
    Exists: (value: string, property?: string) => getErrorMessage(EntityName.Subscriber, value, ErrorSuffix.Exists, property)
  },
  User: {
    ID: {
      NotFound: (value: string) => getErrorMessage(EntityName.User, value, ErrorSuffix.NotFound, FieldName.ID),
      Exists: (value: string) => getErrorMessage(EntityName.User, value, ErrorSuffix.Exists, FieldName.ID)
    },
    Email: {
      NotFound: (value: string) => getErrorMessage(EntityName.User, value, ErrorSuffix.NotFound, FieldName.Email),
      Exists: (value: string) => getErrorMessage(EntityName.User, value, ErrorSuffix.Exists, FieldName.Email),
      NotValid: (value: string) => getErrorMessage(EntityName.User, value, ErrorSuffix.NotValid, FieldName.Email),
    }},
}

export const ValidationErrorMessage = {
  Length: ({constraints}: ValidationArguments) => `From ${constraints[0]} to ${constraints[1]} symbols`
}
