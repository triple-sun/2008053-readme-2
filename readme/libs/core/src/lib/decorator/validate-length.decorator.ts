import { ErrorMessage } from '@readme/error';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Size } from '../const/size.const';
import Property from '../enum/property.enum';
import { capitalize } from '../utils/common.utils';

export const ValidateLength = (validationOptions?: ValidationOptions) => {
  console.log(validationOptions);

  return (object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, {property}: ValidationArguments) {
          const propKey = capitalize(property)
          return value.length >= Size[propKey].Min && value.length <= Size[propKey].Max
        },
        defaultMessage(args: ValidationArguments) {
          const options = args.property === 'tags' ? {...args, property: Property.Tag} : args
          return ErrorMessage.Length(options)
        }
      },
    });
  };
}
