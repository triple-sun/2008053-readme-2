import { ApiPropertyOptions, } from "@nestjs/swagger"
import { APIExample } from "../const/api-example.const"
import { Size } from "../const/size.const"
import { APIPropDesc } from "../const/api-prop.const"
import { AppName } from "../enum/app-name"
import Property from "../enum/property.enum"
import { Entity, PortDefault } from "../enum/utils.enum"

const { Comment, Post, User, Subscriber } = Entity

export const getConstraints = (property: Property) => {
  const constr = Size[property]
  const max = constr ? constr[0] : null
  const min = constr ? constr[1] : null

  switch (true) {
    case !max:
      return {}
    case property === Property.Port:
      return { minimum: min, maximum: max }
    case property === Property.Tags:
      return { maxItems: max, items: getConstraints(Property.Tag)}
    case property === Property.Desc:
      return { maxLength: max}
    case !min:
      return { maximum: max, default: max }
    default:
      return { minLength: min, maxLength: max }
  }
}

export const getApiProp = (entity: Entity, property: Property, options?: ApiPropertyOptions) => {
  console.log(property, entity)
  return {
  ...options,
  ...getConstraints(property),
  description: `${entity} ${APIPropDesc[property]}`,
  example: APIExample[entity] ? APIExample[entity][property] : {},
}}

export const APIOption = {
  User: (prop: Property, options?: ApiPropertyOptions) => getApiProp(User, prop, options),
  Comment: (prop: Property, options?: ApiPropertyOptions) => getApiProp(Comment, prop, options),
  Post: (prop: Property, options?: ApiPropertyOptions) => getApiProp(Post, prop, options),
  Subscriber: (prop: Property, options?: ApiPropertyOptions) => getApiProp(Subscriber, prop, options)
}

export const getAPIConfig = (title: AppName) => ({
  Title: title,
  Desc: `${title} service API`,
  Port: process.env.API_PORT ?? PortDefault[title],
})
