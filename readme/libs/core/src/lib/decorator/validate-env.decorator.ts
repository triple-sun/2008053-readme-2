import { ErrorMessage } from '@readme/error';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Size } from '../const/size.const';

export const ValidateENVProp = (validationOptions?: ValidationOptions) => {
  console.log({validationOptions})
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value) {
          return !!value
        },
        defaultMessage(args: ValidationArguments) {
          return ErrorMessage.ENV(args)
        }
      },
    });
  };
}

export const ValidateENVPort = (validationOptions?: ValidationOptions) => {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value) {
          console.log(value >= Size.Port.Min, Size.Port.Min)
            return typeof value  === 'number' && value <= Size.Port.Max && value > Size.Port.Min
        },
        defaultMessage(args: ValidationArguments) {
            return ErrorMessage.ENV(args)
        }
      },
    });
  };
}
