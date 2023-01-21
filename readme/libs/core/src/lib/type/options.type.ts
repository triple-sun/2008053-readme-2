import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { ApiPropertyOptions } from "@nestjs/swagger";
import { Property } from "../enum/property.enum";
import { Entity } from "../enum/utils.enum";

export type FileOptions = {fieldName: string, localOptions?: MulterOptions}
export type GetSchemaOptions = {entity: Entity, props?: Property[], required?: Property[], options?: ApiPropertyOptions, hasFile?: boolean, requireAll?: boolean}
