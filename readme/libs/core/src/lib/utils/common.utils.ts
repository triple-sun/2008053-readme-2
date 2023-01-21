import { plainToInstance, ClassConstructor } from 'class-transformer';
import { IPost } from '@readme/shared-types';
import { Logger, ParseFilePipeBuilder, UnsupportedMediaTypeException } from '@nestjs/common';
import 'multer'
import { PostRDO } from '../dto/post/post-rdo.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { imageExtRegExp } from '../const/post.const';
import { Prefix, UploadType } from '../enum/utils.enum';
import { AppName } from '../enum/app-name';
import { AppError } from '../const/error.const';

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const fillObject = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

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

export const mapPosts = (posts: IPost[]) => posts.map((post) => fillObject(PostRDO, post))

export function fileMimetypeFilter(...mimetypes: string[]) {
  return (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (mimetypes.some((m) => file.mimetype.includes(m))) {
      callback(null, true);
    } else {
      callback(
        new UnsupportedMediaTypeException(`${AppError.FileType} ${mimetypes.join(', ')}`),
        false,
      );
    }
  };
}

export const logStartup = (appName: AppName, port: string | number) => Logger.log(`🚀 ${appName} REST API service is running on:  http://localhost:${port}/${Prefix.Global}`);

export const getStorageOptions = (type: UploadType) => {
  const filename = ({params}, {originalname}, cb) => {
    const id = type === UploadType.Avatar
      ? crypto.randomUUID()
      : params.userID

    cb(null, `${id}-${type}${extname(originalname)}`)
  }

  const destination = type === UploadType.Avatar
    ? process.env.AVATAR_DIR
    : process.env.UPLOAD_DIR


  return {storage: diskStorage({ destination, filename })}
}

export const getImageUploadPipe = (maxSize: number) => new ParseFilePipeBuilder()
  .addFileTypeValidator({fileType: imageExtRegExp})
  .addMaxSizeValidator({maxSize})
  .build({fileIsRequired: false})

