import { plainToInstance, ClassConstructor } from 'class-transformer';
import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { APIConfig } from '../enum/api.enum';
import { IComment, IPost, IUser } from '@readme/shared-types';
import { PostError } from '../enum/post.enum';
import { ErrorMessage } from './error.utils';
import { ContentType } from '@prisma/client';
import { PostLinkRDO, PostPhotoRDO, PostQuoteRDO, PostTextRDO, PostVideoRDO } from '../rdo/post.rdo';

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
  if (post.userID !== userID) {
    throw new ForbiddenException(ErrorMessage.Post.Forbidden)
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

export const validateCommentUserID = (comment: IComment, userID: string) => {
    if (comment.userID === userID) {
      throw new ForbiddenException(ErrorMessage.Comment.Forbidden)
    }
}

export const validateCommentExists = (commentID: number, comment?: IComment) => {
  if (!comment) {
    throw new NotFoundException(ErrorMessage.Comment.NotFound(commentID))
  }
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
