import { extname } from 'path';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { Tag } from '@prisma/client';
import { Post, PostBase, User } from '@readme/shared-types';
import mongoose, { Model, Types } from 'mongoose';

export const fillObject = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export const getIdArray = (arr: {id?: number}[]) => arr.map(({id}) => id);

export const getContent = (post: Post) => post.content ? post.content : post[post.type.toLowerCase()]

export const formatPost = (post: Post): PostBase => {
  const contentData = getContent(post)
  const {postID, ...content} = contentData

  return {
    ...post,
    content,
    originID: postID
  }
}

export const getMongoConnectionString = ({user, pass, host, port, database, authBase, upload}): string => {
  return `mongodb://${user}:${pass}@${host}:${port}/${database}?authSource=${authBase}`;
}

export const getAvatarUploadDest = (req, file, cb) => {
  cb(null, process.env.AVATAR_DIR)
}

export const getAvatarFileName = (req, file, cb) => {
  const exension = extname(file.originalname);
  cb(null, `${req.params.userID}-avatar${exension}`)
}

export const avatarExtRegExp = (/[/.](jpe?g|png)$/i)

export const postToRDO = (post: Post): PostBase => ({...post, content: post[post.type.toLowerCase()]});

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

export const getToggleAction = async (userID: mongoose.Types.ObjectId, subToID: mongoose.Types.ObjectId, model: Model<User>): Promise<string> => {
  const isSubscribed = await model.findOne({ _id: userID, subscriptions: { '$in': [subToID] }})

  return isSubscribed ? '$pull' : '$addToSet'
}

export const connectOrCreateTags = (tags: Tag[]): {
  where: {title: string}, create: {title: string}
}[] => {
  return tags.map(({title}) => ({
      where: ({title}),
      create: ({title})
  }))
}

