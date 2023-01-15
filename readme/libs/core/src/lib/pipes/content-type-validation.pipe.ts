import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CoreError, PostCreateDTO } from '@readme/core';

@Injectable()
export class ContentTypeValidationPipe implements PipeTransform {
  transform(dto: PostCreateDTO, { type }: ArgumentMetadata) {
    if (type !== 'body') {
      throw new Error(CoreError.BodyArg)
    }

    const contentType = dto.type.toLowerCase();

    if (!dto[contentType]) {
      throw new BadRequestException(CoreError.MongoID);
    }

    return dto;
  }
}
