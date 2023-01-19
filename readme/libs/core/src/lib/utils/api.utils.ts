import { ApiPropertyOptions } from "@nestjs/swagger"
import { ContentType } from "@prisma/client"

import { APIExample } from "../const/api-example.const"
import { Constraints, Required } from "../const/api-options.const"
import { APIPropDesc } from "../const/api-prop.const"
import { Property } from "../enum/property.enum"
import { Entity } from "../enum/utils.enum"

const { Port, Tags, Tag, Desc, Type, IsDraft, IsRepost} = Property

export const getConstraints = (property: Property) => {
  const constr = Constraints[property]
  const max = constr ? constr[0] : null
  const min = constr ? constr[1] : null

  switch (true) {
    case !max:
      return {}
    case property === Port:
      return { minimum: min, maximum: max }
    case property === Tags:
      return { maxItems: max, items: getConstraints(Tag)}
    case property === Desc:
      return { maxLength: max}
    case !min:
      return { maximum: max, default: max }
    default:
      return { minLength: min, maxLength: max }
  }
}

export const getOptions = (prop: Property, entity: Entity, options?: ApiPropertyOptions) => {
  const required = Required[entity]
    .includes(prop)

  const type = prop === Type
    ? { enum: ContentType }
    : {}

  const def = (prop === (IsDraft || IsRepost))
    ? {default: false}
    : {}

  return{ ...options, ...type, ...def, ...getConstraints(prop), required }
}

export const getApiProp = (entity: Entity, property: Property, options?: ApiPropertyOptions) => ({
  description: `${entity} ${APIPropDesc[property]}`,
  example: APIExample[entity] ? APIExample[entity][property] : {},
  ...getOptions(property, entity, options)
})

export const APIProp = {
  Comment: (prop: Property, options?: ApiPropertyOptions) => getApiProp(Entity.Comment, prop, options),
  Post: (prop: Property, options?: ApiPropertyOptions) => getApiProp(Entity.Post, prop, options),
  Users: (prop: Property, options?: ApiPropertyOptions) => getApiProp(Entity.User, prop, options),
}
