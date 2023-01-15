import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CoreError, MinMax } from '@readme/core';

@Injectable()
export class TagsValidationPipe implements PipeTransform {
  transform(tags: string[], { type }: ArgumentMetadata) {
    if (type !== 'body') {
      throw new Error(CoreError.BodyArg)
    }

    if (tags.length > MinMax.TagsLimit) {
      throw new BadRequestException(CoreError.MongoID);
    }

  return [...new Set(tags.map((tag) => tag.toLowerCase()))]
    .filter((tag) => tag.match(/^[a-z]*[a-z][a-z0-9-._]*$/g))
    .filter((tag) => tag.length >= MinMax.TagMin && tag.length <= MinMax.TagMax);
  }
}
