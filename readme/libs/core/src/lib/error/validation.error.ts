import { ValidationArguments } from "class-validator";
import { EntityError } from "./message.error";

export const ValidationMessage = {
  Length: ({constraints}: ValidationArguments) => `From ${constraints[0]} to ${constraints[1]} symbols`,
  Email:({value}: ValidationArguments) => EntityError.User.Email.Invalid(value)
}
