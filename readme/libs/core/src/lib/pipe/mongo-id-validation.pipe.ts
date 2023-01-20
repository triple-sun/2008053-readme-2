import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ErrorMessage } from '@readme/error';

@Injectable()
export class MongoIDValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param' && type !== 'query' && type !== 'custom') {
      throw new BadRequestException(ErrorMessage.Common.ParamArg)
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ErrorMessage.Common.MongoID);
    }

    return value;
  }
}
