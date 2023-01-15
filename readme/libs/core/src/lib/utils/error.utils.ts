import { ValidationArguments } from "class-validator";

import { ErrorSuffix } from "../enum/core-error.enum";
import { FieldName } from "../enum/field-name.enum";
import { EntityName } from "../enum/utils.enum";

const getErrorMessage = (entity: EntityName, value: string, suffix: ErrorSuffix, field?: FieldName) => `${entity} ${ field ? `with ${field}`: ''} ${value} ${suffix}`

const getCommentErrorMessage = (value: string, suffix: ErrorSuffix, field?: FieldName) => getErrorMessage(EntityName.Comment, value, suffix, field)
const getPostErrorMessage = (value: string, suffix: ErrorSuffix, field?: FieldName) => getErrorMessage(EntityName.Post, value, suffix, field)
const getSubErrorMessage = (value: string, suffix: ErrorSuffix, field?: FieldName) => getErrorMessage(EntityName.Subscriber, value, suffix, field)
const getUserErrorMessage = (value: string, suffix: ErrorSuffix, field?: FieldName) => getErrorMessage(EntityName.User, value, suffix, field)

export const ExistsErrorMessage = {
  PostExistsID: (postID: number) => getPostErrorMessage(postID.toString(), ErrorSuffix.Exists, FieldName.ID),
  SubExistsEmail: (email: string) => getSubErrorMessage(email, ErrorSuffix.Exists, FieldName.Email),
  UserExitsEmail: (email: string) => getUserErrorMessage(email, ErrorSuffix.Exists, FieldName.Email),
}

export const NotFoundErrorMessage = {
  CommentNotFoundID: (commentID: number) => getCommentErrorMessage(commentID.toString(), ErrorSuffix.NotFound, FieldName.ID),
  PostNotFoundID: (postID: number) => getPostErrorMessage(postID.toString(), ErrorSuffix.NotFound, FieldName.ID),
  SubNotFoundEmail: (email: string) => getSubErrorMessage(email, ErrorSuffix.NotFound, FieldName.Email),
  SubNotFoundUserID: (userID: string) => getSubErrorMessage(userID, ErrorSuffix.NotFound, FieldName.UserID),
  UserNotFoundEmail: (email: string) => getUserErrorMessage(email, ErrorSuffix.NotFound, FieldName.Email),
  UserNotFoundID: (userID: string) => getUserErrorMessage(userID, ErrorSuffix.NotFound, FieldName.ID),
}

export const ValidationErrorMessage = {
  Length: ({constraints}: ValidationArguments) => `From ${constraints[0]} to ${constraints[1]} symbols`
}
