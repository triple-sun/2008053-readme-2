import { ApiPropertyOptions } from "@nestjs/swagger";
import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { Property } from "../enum/property.enum";
import { Entity, Upload } from "../enum/utils.enum";

export type TSchemaOptions = {
  entity: Entity, props?: Property[], required?: Property[], fileName?: Upload,
  options?: ApiPropertyOptions, schema?: SchemaObject, hasFile?: boolean, requireAll?: boolean
}
