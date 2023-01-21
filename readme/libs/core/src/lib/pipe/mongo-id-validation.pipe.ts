import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AppError, InvalidError } from '../const/error.const';

@Injectable()
export class MongoIDValidationPipe implements PipeTransform {
  transform(value: string, { type, data }: ArgumentMetadata) {
    if (type !== 'param' && type !== 'query' && type !== 'custom') {
      throw new BadRequestException(AppError.ParamArg)
    }

    if (!Types.ObjectId.isValid(value)) {
      console.log(value, data)
      throw new BadRequestException(InvalidError({value, property: data}));
    }

    return value;
  }
}
