import { plainToInstance, ClassConstructor } from 'class-transformer';
import { ParseFilePipeBuilder } from '@nestjs/common';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { imageExtRegExp } from '../const/post.const';
import { Upload } from '../enum/utils.enum';

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

export const getStorageOptions = (type: string) => {
  const filename = ({params}, {originalname}, cb) => {
    const id = type === Upload.Avatar
      ? crypto.randomUUID()
      : params.userID

    cb(null, `${id}-${type}${extname(originalname)}`)
  }

  const destination = type === Upload.Avatar
    ? process.env.AVATAR_DIR
    : process.env.UPLOAD_DIR


  return {storage: diskStorage({ destination, filename })}
}

export const getImageUploadPipe = (maxSize: number) => new ParseFilePipeBuilder()
  .addFileTypeValidator({fileType: imageExtRegExp})
  .addMaxSizeValidator({maxSize})
  .build({fileIsRequired: false})

export const capitalize = (str: string) => str.toString().charAt(0).toUpperCase() + str.slice(1);

export const mapArrToObject = <T, V>(arr: T[], mapFn: (item: T) => V) => Object.fromEntries(new Map(arr.map((item) => [item, mapFn(item)])))
