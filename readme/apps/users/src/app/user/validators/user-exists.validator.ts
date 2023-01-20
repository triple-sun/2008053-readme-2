import { Injectable } from "@nestjs/common";
import { AppError } from "@readme/error";
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
    return AppError.User.Email.Exists(value)
  }
}

@ValidatorConstraint({ async: true })
@Injectable()
export class UserExistIDRule implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(userID: string) {
    const user = await this.userRepository.findOne(userID)

    return !!user
  }

  defaultMessage({value}: ValidationArguments) {
    return AppError.User.ID.NotFound(value)
  }
}

@ValidatorConstraint({ async: true })
@Injectable()
export class UserExistEmailRule implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(email: string) {
    const user = await this.userRepository.findByEmail(email)

    return !!user
  }

  defaultMessage({value}: ValidationArguments) {
    return AppError.User.Email.NotFound(value)
  }
}

