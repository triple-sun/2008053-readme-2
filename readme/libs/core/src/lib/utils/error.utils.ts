import { EntityName, FieldName } from "../enum/utils.enum";

export const getNotFoundError = (entity: EntityName, value: string, field?: FieldName) => `${entity} ${ field ? `with ${field}`: ''} ${value} was not found`

export const ErrorMessage = {
  SubNotFound: (email: string) => getNotFoundError(EntityName.Subscriber, email, FieldName.Email),
}
