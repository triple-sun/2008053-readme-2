import { extname } from 'path';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { ParseFilePipeBuilder } from '@nestjs/common';
import { ContentType } from '@prisma/client';
import { Photo } from '../dto/content/photo';
import { UploadType } from '../enum/utils.enum';
import { diskStorage } from 'multer';
import { PostUpdateDTO } from '../dto/post-update.dto';


export const fillObject = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export const getIdArray = (arr: {id?: number}[]) => arr.map(({id}) => id);

export const imageExtRegExp = (/[/.](jpe?g|png)$/i)

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
  .build()

export const handlePostDTO = <T extends PostUpdateDTO>(dto: T, photoLink?: string): T => dto.type === ContentType.PHOTO
      ? {...dto, photo: new Photo(photoLink)}
      : dto
