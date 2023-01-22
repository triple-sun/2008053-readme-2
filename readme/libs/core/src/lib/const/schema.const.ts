import { ApiBodyOptions } from "@nestjs/swagger";
import { UserIDDTO, UserLoginDTO } from "../dto/user/user.dto";
import { Property } from "../enum/property.enum";
import { Entity } from "../enum/utils.enum";
import { getSchema } from "../utils/schema.utils";

export const UserIDSchema = {
  ...getSchema({
    entity: Entity.User,
    props: [Property.Id],
    requireAll: true
}), type: UserIDDTO }

export const UserLoginSchema = {
  ...getSchema({
    entity: Entity.User,
    props: [Property.Email, Property.Password],
    requireAll: true
  }), type: UserLoginDTO
}

export const UserRegisterSchema = getSchema({
  entity: Entity.User,
  props: [Property.Email, Property.Name, Property.Password],
  requireAll: true,
  hasFile: true,
})

export const UserUpdateSchema = getSchema({
  entity: Entity.User, props: [Property.Password],
  hasFile: true
})

export const PostCreateSchema: ApiBodyOptions = getSchema({
  entity: Entity.Post,
  props: [Property.Type, Property.Content, Property.Tags],
  required: [Property.Type, Property.Content],
  hasFile: true
})

export const PostUpdateSchema: ApiBodyOptions = getSchema({
  entity: Entity.Post,
  props: [Property.Type, Property.Content, Property.Tags],
  required: [],
  hasFile: true
})

export const CommentCreateSchema: ApiBodyOptions = getSchema({
  entity: Entity.Comment,
  props: [Property.Comment],
  requireAll: true
})

