/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { extname } from 'path';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { Tag } from '@prisma/client';
import { IPost, IPostBase, IUser } from '@readme/shared-types';
import mongoose, { Model } from 'mongoose';
import * as Joi from 'joi';
import { validateSync } from 'class-validator';
import { APIEnvConfig } from '../config/env.config';
import { Prefix } from '../enum/utils.enum';


export const fillObject = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export const getIdArray = (arr: {id?: number}[]) => arr.map(({id}) => id);

export const getContent = (post: IPost) => post.content ? post.content : post[post.type.toLowerCase()]

export const formatPost = (post: IPost): IPostBase => {
  const contentData = getContent(post)
  const {postID, ...content} = contentData

  return {
    ...post,
    content,
    originID: postID
  }
}

export const getAppRunningString = (appName: string, port: number | string) => `🚀 ${appName} REST API is running on:  http://localhost:${port}/${Prefix.Global}`

export const getMongoConnectionString = ({user, pass, host, port, database, authBase}): string => {
  return `mongodb://${user}:${pass}@${host}:${port}/${database}?authSource=${authBase}`;
}

export const getMailerTransportString = ({user, pass, host, port}): string => {
  return `smtp://${user}:${pass}@${host}:${port}`;
}

export const getAMQPConnectionString = ({user, pass, host}): string => {
  return `amqp://${user}:${pass}@${host}`;
}

export const getAvatarUploadDest = (req, file, cb) => {
  cb(null, process.env.AVATAR_DIR)
}

export const getAvatarFileName = (req, file, cb) => {
  const exension = extname(file.originalname);
  cb(null, `${req.params.userID}-avatar${exension}`)
}

export const avatarExtRegExp = (/[/.](jpe?g|png)$/i)

export const postToRDO = (post: IPost): IPostBase => ({...post, content: post[post.type.toLowerCase()]});

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

export const getToggleAction = async (userID: mongoose.Types.ObjectId, subToID: mongoose.Types.ObjectId, model: Model<IUser>): Promise<string> => {
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

export const getAPIEnvSchema = (defaultAPIPort: number) => ({
  API_PORT: Joi
    .number()
    .port()
    .default(defaultAPIPort)
    .required()
})

export const getAppEnvSchema = (defaultAPIPort: number, ...schemas: Joi.PartialSchemaMap[]) => {
  let envSchema: Joi.PartialSchemaMap

  schemas.forEach(schema => {
    envSchema = {...schema, envSchema}
  });

  return Joi.object({
  ...getAPIEnvSchema(defaultAPIPort),
  ...envSchema
})}

export const validateEnv = (envConfig: typeof APIEnvConfig) => (
  (config: Record<string, unknown>) => {
    const environmentsConfig = plainToInstance(
      envConfig,
      config,
      { enableImplicitConversion: true  },
    );

    const errors = validateSync(
      environmentsConfig, {
        skipMissingProperties: false
      }
    );

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return environmentsConfig;
  }
)
