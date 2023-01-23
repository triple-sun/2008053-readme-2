import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Size } from '../utils/size.utils';
import { Property } from '../enum/property.enum';
import { capitalize } from '../utils/common.utils';
import { getLengthErrorMessage } from '../utils/error.utils';

export const ValidateLength = (validationOptions?: ValidationOptions) => {
  return (object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, {property}: ValidationArguments) {
          const propKey = (property === Property.Tags) ? capitalize(Property.Tag) : capitalize(property)

          const result = (value.length >= Size[propKey]?.Min) && (value.length <= Size[propKey]?.Max)

          return result
        },
        defaultMessage(args: ValidationArguments) {
          const property = capitalize(args.property)

          const constraints = [Size[property].Min]

          if ( Size[property].Max ) {
            constraints.push(Size[property].Max)
          }

          return getLengthErrorMessage({...args, constraints})
        }
      },
    });
  };
}
