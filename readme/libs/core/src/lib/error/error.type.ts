import { ErrorType } from "./common.error.enum"
import { Entity } from "../enum/utils.enum"

export enum ErrorProperty {
  ID = 'ID',
  Email = 'Email'
}

export type TError = Record<ErrorType, (value?: string | number) => string | string>
export type TPropErrors = Record<keyof typeof ErrorProperty, TError>

export type TErrorProps = {
  entity: Entity,
  value?: number | string,
  type?: ErrorType,
  prop?: typeof ErrorProperty
}



