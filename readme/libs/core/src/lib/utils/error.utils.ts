import { ValidationArguments } from "class-validator";
import { Error } from "../enum/core-error.enum";
import { FieldName } from "../enum/field-name.enum";
import { EntityName } from "../enum/utils.enum";

const getErrorMessage = (entity: EntityName, value: string | number, suffix: Error, property?: string) => `${entity} ${ property ? `with ${property}`: ''} ${value} ${suffix}`

export const ErrorMessage = {
  Comment: {
      NotFound: (id: number) => getErrorMessage(EntityName.Comment, id, Error.NotFound, FieldName.ID),
      Exists: (id: number) => getErrorMessage(EntityName.Comment, id, Error.Exists, FieldName.ID)
  },
  Post: {
      NotFound: (id: number) => getErrorMessage(EntityName.Post, id, Error.NotFound, FieldName.ID),
      Exists: (id: number) => getErrorMessage(EntityName.Post, id, Error.Exists, FieldName.ID)
  },
  Sub: {
    NotFound: (value: string, property?: string) => getErrorMessage(EntityName.Subscriber, value, Error.NotFound, property),
    Exists: (value: string, property?: string) => getErrorMessage(EntityName.Subscriber, value, Error.Exists, property)
  },
  User: {
    ID: {
      NotFound: (value: string) => getErrorMessage(EntityName.User, value, Error.NotFound, FieldName.ID),
      Exists: (value: string) => getErrorMessage(EntityName.User, value, Error.Exists, FieldName.ID)
    },
    Email: {
      NotFound: (value: string) => getErrorMessage(EntityName.User, value, Error.NotFound, FieldName.Email),
      Exists: (value: string) => getErrorMessage(EntityName.User, value, Error.Exists, FieldName.Email)
    }}
}

export const ValidationErrorMessage = {
  Length: ({constraints}: ValidationArguments) => `From ${constraints[0]} to ${constraints[1]} symbols`
}
