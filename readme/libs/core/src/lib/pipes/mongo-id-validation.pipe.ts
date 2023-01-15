import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CoreError } from '@readme/core';

@Injectable()
export class MongoIDValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param' && type !== 'query') {
      throw new Error(CoreError.ParamArg)
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(CoreError.MongoID);
    }

    return value;
  }
}
