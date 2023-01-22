import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { LengthError } from '../const/error.const';
import { Size } from '../utils/size.utils';
import { Property } from '../enum/property.enum';
import { capitalize } from '../utils/common.utils';

export const ValidateLength = (validationOptions?: ValidationOptions) => {
  return (object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, {property}: ValidationArguments) {
          const propKey = (property === Property.Tags) ? capitalize(Property.Tag) : capitalize(property)

          return value.length >= Size[propKey].Min && value.length <= Size[propKey].Max
        },
        defaultMessage(args: ValidationArguments) {
          const options = args.property === 'tags' ? {...args, property: Property.Tag} : args
          return LengthError(options)
        }
      },
    });
  };
}
