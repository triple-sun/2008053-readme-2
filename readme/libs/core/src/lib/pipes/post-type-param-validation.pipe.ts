import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ContentType } from '@prisma/client';
import { CoreError } from '@readme/core';

@Injectable()
export class PostTypeParamValidationPipe implements PipeTransform {
  transform(param: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(CoreError.ParamArg)
    }

    if (!(param.toUpperCase() in ContentType)) {
        throw new BadRequestException(CoreError.Type);
    }

    return ContentType[param]
  }
}

