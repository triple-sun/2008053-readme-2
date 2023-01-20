import { plainToInstance, ClassConstructor } from 'class-transformer';
import { DocumentBuilder } from '@nestjs/swagger';
import { IPost } from '@readme/shared-types';
import { Logger, UnsupportedMediaTypeException } from '@nestjs/common';
import 'multer'
import { ErrorMessage } from '@readme/error';
import { APIConfig } from '../const/api.const';
import { AppName } from '../enum/app-name';
import { Prefix } from '../enum/utils.enum';
import { PostRDO } from '../dto/rdo/post.rdo';

export const getSwaggerDocument = (title: string, desc: string) => new DocumentBuilder()
    .setTitle(title)
    .setDescription(desc)
    .setVersion(APIConfig.Version)
    .build()


export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

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
        new UnsupportedMediaTypeException(`${ErrorMessage.Common.FileType} ${mimetypes.join(', ')}`),
        false,
      );
    }
  };
}

export const getSize = (max: number, min?: number) => ({Max: max, Min: min ?? null})


export const logStartup = (appName: AppName, port: number) => Logger.log(`🚀 ${appName} REST API service is running on:  http://localhost:${port}/${Prefix.Global}`);
