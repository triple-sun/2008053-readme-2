import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CoreError, PostCreateDTO } from '@readme/core';

@Injectable()
export class PostTypeDTOValidationPipe implements PipeTransform {
  transform(dto: PostCreateDTO, { type }: ArgumentMetadata) {
    if (type !== 'body') {
      throw new Error(CoreError.BodyArg)
    }

    if (!dto[dto.type.toLowerCase()]) {
        throw new BadRequestException(CoreError.DtoType);
    }

    return dto;
  }
}
