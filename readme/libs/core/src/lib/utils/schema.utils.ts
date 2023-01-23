import { APIExample } from "../enum/api-example.enum"
import { Entity } from "../enum/utils.enum"
import { Property } from "../enum/property.enum"
import { capitalize, mapArrToObject } from "./common.utils"
import { APIDescripion } from "../enum/api-description.enum"
import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"
import { ApiBodyOptions, ApiPropertyOptions } from "@nestjs/swagger"
import { getConstraints, Size } from "./size.utils"
import { TSchemaOptions } from "../type/options.type"

export const getOptions = <T extends SchemaObject | ApiPropertyOptions = Record<string, SchemaObject>> (
  entity: Entity, property: Property, options?: ApiPropertyOptions
) : T => {
  const prop = capitalize(property.toString())
  const example = APIExample[prop] ?? ''
  const description = APIDescripion[prop] ? `${entity} ${APIDescripion[prop]}` : `${entity} ${property}`
  const constraints = Size[prop] ? getConstraints(prop, options?.type?.toString()) : {}
  const title = property ?? ''

  return {
    title,
    example,
    description,
    ...constraints,
    ...options
  } as T
}

export const getSchemaForProps = (entity: Entity, props: Property[], options?: ApiPropertyOptions) => {
  if (props.length < 1) {
    return {}
  }

  const schema = mapArrToObject<Property, SchemaObject>(props, (item) => ({...getOptions<SchemaObject>(entity, item, options)}))

  return schema as Record<string, SchemaObject>
}

export const getSchema = ({props = [], required = [], options = {}, entity, hasFile = false, requireAll = false}: TSchemaOptions): ApiBodyOptions => {
  return {
  schema: {
    type: "object",
    required: requireAll ? props : required,
    properties: {
      ...(hasFile ? { file: { type: "file", format: "binary" }} : {}),
      ...getSchemaForProps(entity, props, options),
    }}
  }
}
