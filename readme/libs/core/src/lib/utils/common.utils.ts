import { plainToInstance, ClassConstructor } from 'class-transformer';
import { DocumentBuilder } from '@nestjs/swagger';
import { APIConfig } from '../enum/config.enum';
import { IPost } from '@readme/shared-types';
import { ContentType } from '@prisma/client';
import { PostLinkRDO, PostPhotoRDO, PostQuoteRDO, PostTextRDO, PostVideoRDO } from '../rdo/post.rdo';
import { CommonError } from '../error/common.error.enum';
import { UnsupportedMediaTypeException } from '@nestjs/common';
import 'multer'

export const getDocument = (title: string, desc: string) => {
  return new DocumentBuilder()
    .setTitle(title)
    .setDescription(desc)
    .setVersion(APIConfig.Version)
    .build()
}

export const fillObject = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export const toggleArrElement = (array: string[], value: string) => {
  const result = [...array]
  const index = array.indexOf(value);

  if (index === -1) {
      result.push(value);
  } else {
      result.splice(index, 1);
  }

  return result
}

export const fillPostRDO = (post: IPost) => {
    switch(post.type) {
      case ContentType.PHOTO:
        return fillObject(PostPhotoRDO, post);
      case ContentType.LINK:
        return fillObject(PostLinkRDO, post);
      case ContentType.QUOTE:
        return fillObject(PostQuoteRDO, post);
      case ContentType.TEXT:
        return fillObject(PostTextRDO, post);
      case ContentType.VIDEO:
        return fillObject(PostVideoRDO, post);
    }
  }

export function fileMimetypeFilter(...mimetypes: string[]) {
  return (
    req,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (mimetypes.some((m) => file.mimetype.includes(m))) {
      callback(null, true);
    } else {
      callback(
        new UnsupportedMediaTypeException(
          `${CommonError.FileType} ${mimetypes.join(', ')}`,
        ),
        false,
      );
    }
  };
}
