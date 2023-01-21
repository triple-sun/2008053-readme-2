import { ApiPropertyOptions, } from "@nestjs/swagger"
import { APIExample } from "../const/api-example.const"
import { Size } from "../const/size.const"
import { PropertyDescripion } from "../const/api-prop.const"
import { capitalize } from "./common.utils"
import { Entity } from "../enum/utils.enum"
import { Property } from "../enum/property.enum"

const { Comment, Post, User, Subscriber } = Entity

const getOptions = (property: Property) => {
  const constr = Size[capitalize(property)]
  const max = constr ? constr[0] : null
  const min = constr ? constr[1] : null

  switch (true) {
    case !constr:
      return {}
    case property === Property.Port:
      return { minimum: min, maximum: max }
    case property === Property.Tags:
      return
    case property === Property.Desc:
      return { maxLength: max}
    case constr:
      return { maximum: max, default: max }
    default:
      return {}
  }
}

const getApiProp = (entity: Entity, property: Property, options?: ApiPropertyOptions): ApiPropertyOptions => {
  const prop = capitalize(property)
  const ent = capitalize(entity)
  const example = APIExample[prop] ? {[prop]: APIExample[prop]} : {}
  const description = PropertyDescripion[prop] ? {[prop]: `${ent} ${PropertyDescripion[prop]}`} : {}
  const constraints = options ?? getOptions(property)

  console.log({property}, {prop}, PropertyDescripion[prop])
  return {
  ...constraints,
  ...example,
  ...description
}}

const DTOProperty = {
  UserProperty: (prop: Property, options?: ApiPropertyOptions) => getApiProp(User, prop, options),
  CommentProperty: (prop: Property, options?: ApiPropertyOptions) => getApiProp(Comment, prop, options),
  PostProperty: (prop: Property, options?: ApiPropertyOptions) => getApiProp(Post, prop, options),
  SubProperty: (prop: Property, options?: ApiPropertyOptions) => getApiProp(Subscriber, prop, options)
}

export const { UserProperty, CommentProperty, PostProperty, SubProperty } = DTOProperty
