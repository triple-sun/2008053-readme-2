/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentType } from '@prisma/client';
import { Post } from '@readme/shared-types';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { extname } from 'path';

export const fillObject = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export const getMongoConnectionString = ({user, pass, host, port, database, authBase, upload}): string => {
  console.log(upload)
  return `mongodb://${user}:${pass}@${host}:${port}/${database}?authSource=${authBase}`;
}

export const getAvatarUploadDest = (req, file, cb) => {
  cb(null, process.env.AVATAR_DIR)
}

export const getAvatarName = (req, file, cb) => {
  const exension = extname(file.originalname);
  cb(null, `${req.params.userID}-avatar${exension}`)
}

export const avatarExtRegExp = (/[/.](jpe?g|png)$/i)

export const getIncludeForType = ({
  [ContentType.LINK]: {url: true, desc: true},
  [ContentType.PHOTO]: {photo: true},
  [ContentType.QUOTE]: {quote: true, author: true},
  [ContentType.TEXT]: {title: true, ann: true, text: true},
  [ContentType.VIDEO]: {videoUrl: true, title: true}
})

export const formatPostDataForCreate = (item: Post) => {
  const {content, link, photo, quote, video, text, id, userID, ...post} = item
  const {type} = content
  const includeType = getIncludeForType[type]

  const data = {
    ...post,
    userID,
    type,
    [type.toLowerCase()]: {
      create: {...content}
    },
    comments: {
      connect: [...item.comments]
      },
    }

    return {
      data,
      include: {
        [type.toLowerCase()]: true,
        comments: true,
      }
    }
}

export const formatPostForRDO = (post: Post) => {
  const {comments, video, type, link, photo, quote, text, authorID, originID, ...rdo} = post
  const commentIDs = post.comments.map((comment) => comment.id)

  const repostData = post.isRepost ? {authorID, originID} : {}

  switch (type) {
    case ContentType.LINK:
      {
        const {id, ...content} = link
        return {...rdo, ...repostData, content, commentIDs}
      }
    case ContentType.PHOTO:
      {
        const {id, ...content} = photo
        return {...rdo, ...repostData, content}
      }
    case ContentType.QUOTE:
      {
        const {id, ...content} = quote
        return {...rdo, ...repostData, content}
      }
    case ContentType.TEXT:
      {
        const {id, ...content} = text
        return {...rdo, ...repostData, content}
      }
    case ContentType.VIDEO:
      {
        const {id, ...content} = video
        return {...rdo, ...repostData, content}
      }
  }
}

export const formatPostDataForUpdate = (id: number, item: Post) => {
  const { isDraft, content: {type, ...content}, likes } = item;

  const data = {
    isDraft,
    type,
    likes,
    [type.toLowerCase()]: {
      upsert: {
        create: content,
        update: {...content}
      }
    }
  }

  return {
    where: {
      id
    },
    data,
    include: {
      [type.toLowerCase()]: true,
      comments: true,
    }
  }
}

export const formatPostDataForEntity = (item: Post) => {
  const {type, id, userID, ...post} = item
  const oldContent = item[type.toLowerCase()]

  const { id: oldContentID, ...content} = oldContent

  return {
    ...post,
    userID,
    content
    }
}

export const toggle = (array: string[], value: string) => {
  const result = [...array]
  const index = array.indexOf(value);

  if (index === -1) {
      result.push(value);
  } else {
      result.splice(index, 1);
  }

  console.log({array, value, index, result})

  return result
}
