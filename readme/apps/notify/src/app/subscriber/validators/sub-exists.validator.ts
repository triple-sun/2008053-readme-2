import { Injectable } from "@nestjs/common";
import { ErrorMessage, Constraint } from "@readme/core";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { SubscriberRepository } from "../subscriber.repository";

@ValidatorConstraint({ name: Constraint.EmailAlreadyExists, async: true })
@Injectable()
export class SubAlreadyExistsEmail implements ValidatorConstraintInterface {
  constructor(private subRepository: SubscriberRepository) {}

  async validate(email: string) {
    const sub = await this.subRepository.findByEmail(email);

    return !sub
  }

  defaultMessage({value}: ValidationArguments) {
    return ErrorMessage.User.Email.Exists(value)
  }
}

@ValidatorConstraint({ name: Constraint.EmailAlreadyExists, async: true })
@Injectable()
export class SubAlreadyExistsUserID implements ValidatorConstraintInterface {
  constructor(private subRepository: SubscriberRepository) {}

  async validate(id: string) {
    const sub = await this.subRepository.findByUserID(id);

    return !sub
  }

  defaultMessage({value}: ValidationArguments) {
    return ErrorMessage.User.Email.Exists(value)
  }
}

@ValidatorConstraint({ name: Constraint.UserExists, async: true })
@Injectable()
export class SubExistsID implements ValidatorConstraintInterface {
  constructor(private subRepository: SubscriberRepository) {}

  async validate(userID: string) {
    const sub = await this.subRepository.findOne(userID)

    return !!sub
  }

  defaultMessage({value}: ValidationArguments) {
    return ErrorMessage.User.ID.NotFound(value)
  }
}

@ValidatorConstraint({ name: Constraint.UserExists, async: true })
@Injectable()
export class SubExistsEmail implements ValidatorConstraintInterface {
  constructor(private subRepository: SubscriberRepository) {}

  async validate(email: string) {
    const sub = await this.subRepository.findByEmail(email)

    return !!sub
  }

  defaultMessage({value}: ValidationArguments) {
    return ErrorMessage.User.ID.NotFound(value)
  }
}

