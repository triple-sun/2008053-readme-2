import { EAppError } from "../enum/app-error";
import { Property } from "../enum/property.enum";
import { Entity } from "../enum/utils.enum";
import { IMessageProps } from "../type/error.type";
import { getENVErrorMessage, getExistsMessage, getInvalidMessage, getLengthErrorMessage, getNotFoundMessage, getPermissionErrorMessage } from "../utils/error.utils";

const { ID, Email} = Property

const { User, Comment, Post } = {
  User: {
    Email: {entity: Entity.User, property: Email},
    ID: {entity: Entity.User, property: ID}
  },
  Comment: {entity: Entity.Comment, property: ID},
  Post: {entity: Entity.Post, property: ID}
}

const ErrorMessage = {
  Exists: (props: IMessageProps) => getExistsMessage(props),
  NotFound: (props: IMessageProps) => getNotFoundMessage(props),
  Permission: (props: IMessageProps) => getPermissionErrorMessage(props),
  Invalid: (props: IMessageProps) => getInvalidMessage(props),
  ENV: getENVErrorMessage,
  Length: getLengthErrorMessage,
  App: EAppError
}

const Error = {
  ENVError: ErrorMessage.ENV,
  LengthError: ErrorMessage.Length,
  AppError: ErrorMessage.App,
  InvalidError: ErrorMessage.Invalid,
  UserError: {
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
  CommentError: {
    Permission: ErrorMessage.Permission(Comment),
    NotFound: ErrorMessage.NotFound(Comment),
    Invalid: ErrorMessage.Invalid(Comment)
  },
  PostError: {
    Permission: ErrorMessage.Permission(Post),
    NotFound: ErrorMessage.NotFound(Post),
    Invalid: ErrorMessage.Invalid(Post)
  }
}


export const {
  UserError,
  CommentError,
  PostError,
  AppError,
  ENVError,
  InvalidError,
  LengthError,

 } = Error
