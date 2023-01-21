import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { ENVError } from '../const/error.const';
import { Size } from '../utils/size.utils';

export const ValidateENVProp = (validationOptions?: ValidationOptions) => {
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
          return ENVError(args)
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
          console.log(value >= Size.Port.Max, Size.Port.Min)
            return typeof value  === 'number' && value <= Size.Port.Max && value > Size.Port.Min
        },
        defaultMessage(args: ValidationArguments) {
            return ENVError(args)
        }
      },
    });
  };
}
