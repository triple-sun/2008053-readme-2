import { RpcException } from "@nestjs/microservices"
import { ValidationArguments } from "class-validator"
import { Property } from "../enum/property.enum"
import { Entity } from "../enum/utils.enum"

export enum ErrorRype {
  NotFound = 'NotFound',
  Exists = 'Exists',
  Invalid = 'Invalid',
  Permission = 'Permission',
  Email = 'Email',
  Length = 'Length',
  ENV = 'ENV',
  Common = 'Common',
}

export interface IMessageProps extends Partial<ValidationArguments> {
  type?: ErrorRype,
  entity?: Entity,
  property?: Property | string
}
