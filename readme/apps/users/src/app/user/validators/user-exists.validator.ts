import { Injectable } from "@nestjs/common";
import { ErrorMessage, Constraint } from "@readme/core";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserRepository } from "../user.repository";

@ValidatorConstraint({ async: true })
@Injectable()
export class UserAlreadyExistsRule implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(email: string) {
    const user = await this.userRepository.findByEmail(email);

    return !user
  }

  defaultMessage({value}: ValidationArguments) {
    return ErrorMessage.User.Email.Exists(value)
  }
}

@ValidatorConstraint({ name: Constraint.UserExists, async: true })
@Injectable()
export class UserExistIDRule implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(userID: string) {
    const user = await this.userRepository.findOne(userID)

    return !!user
  }

  defaultMessage({value}: ValidationArguments) {
    return ErrorMessage.User.ID.NotFound(value)
  }
}

@ValidatorConstraint({ name: Constraint.UserExists, async: true })
@Injectable()
export class UserExistEmailRule implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(email: string) {
    const user = await this.userRepository.findByEmail(email)

    return !!user
  }

  defaultMessage({value}: ValidationArguments) {
    return ErrorMessage.User.ID.NotFound(value)
  }
}

