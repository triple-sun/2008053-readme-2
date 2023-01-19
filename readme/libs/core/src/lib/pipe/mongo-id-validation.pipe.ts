import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CommonError } from '../error/common.error.enum';

@Injectable()
export class MongoIDValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    console.log(type)
    if (type !== 'param' && type !== 'query' && type !== 'custom') {
      throw new Error(CommonError.ParamArg)
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(CommonError.MongoID);
    }

    return value;
  }
}
