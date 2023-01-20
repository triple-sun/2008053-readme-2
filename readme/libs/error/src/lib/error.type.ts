import { EProperty } from "./enum/property.enum"
import { EEntity } from "./enum/model.enum"
import { ValidationArguments } from "class-validator"
import { EType } from "./enum/type.enum"
import { ErrorMessage } from "./error.const"
import { Type } from "@nestjs/common"

export type TProp = EProperty.ID | EProperty.Email

export interface IMessageProps extends Partial<ValidationArguments> {
  type?: EType,
  entity?: EEntity,
  property?: EProperty | string
}

export type TErrorCallbackFn = (value: string | number, props?: IMessageProps) => string

export type TEntityFn<T> = (type: EType) => ((entity?: EEntity) => T)
