import {plainToInstance, ClassConstructor} from 'class-transformer';
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
  cb(null, `${req.userID}-avatar${exension}`)
}

export const avatarExtRegExp = (/[/.](jpe?g|png)$/i)
