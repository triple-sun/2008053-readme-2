import { FieldName } from "../enum/field-name.enum";
import { EntityName } from "../enum/utils.enum";

export const getDescForEntity = (entity: EntityName, field: FieldName) => `${entity} ${field}`;

export const getDescForPost = (field: FieldName) => getDescForEntity(EntityName.Post, field);
export const getDescForComment = (field: FieldName) => getDescForEntity(EntityName.Comment, field);
export const getDescForUser = (field: FieldName) => getDescForEntity(EntityName.User, field)
export const getDescForSub = (field: FieldName) => getDescForEntity(EntityName.Subscriber, field)
