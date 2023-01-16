import { extname } from 'path';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { ConflictException, ForbiddenException, NotFoundException, ParseFilePipeBuilder } from '@nestjs/common';
import { ContentType } from '@prisma/client';
import { Photo } from '../entity/content/photo';
import { UploadType } from '../enum/utils.enum';
import { diskStorage } from 'multer';
import { DocumentBuilder } from '@nestjs/swagger';
import { APIConfig } from '../enum/api.enum';
import { IPost, IUser } from '@readme/shared-types';
import { PostError } from '../enum/post.enum';
import { ErrorMessage } from './error.utils';
import { PostCreateDTO } from '../dto/post-create.dto';

export const getDocument = (title: string, desc: string) => {
  return new DocumentBuilder()
    .setTitle(title)
    .setDescription(desc)
    .setVersion(APIConfig.Version)
    .build()
}

export const validateUserAlreadyExists = (user?: IUser) => {
  if (user) {
    throw new ConflictException(ErrorMessage.User.Email.Exists(user.email))
  }
}

export const validateUserExists = (userID: string, user?: IUser) => {
  if (!user) {
    throw new NotFoundException(ErrorMessage.User.ID.NotFound(userID))
  }
}

export const validatePostExists = (post: IPost, postID: number) => {
  if (!post) {
    throw new NotFoundException(ErrorMessage.Post.NotFound(postID))
  }
}

export const validatePostUserID = (post: IPost, userID: string) => {
  if (post.userID === userID) {
    throw new ForbiddenException(PostError.Permission)
  }
}

export const validateRepost = (origin: IPost, userID: string) => {
    if (origin.authorID === userID) {
      throw new ConflictException(PostError.SelfRepost)
    }

    if (origin.userID === userID) {
      throw new ConflictException(PostError.DuplicateRepost)
    }
}

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

export const handlePostDTO = <T extends PostCreateDTO>(dto: T, photoLink?: string): T => dto.type === ContentType.PHOTO
      ? {...dto, photo: new Photo(photoLink)}
      : dto
