import {plainToInstance, ClassConstructor} from 'class-transformer';

export const fillObject = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export const fillEntity = <T, V>(obj: T, entity: V) => {
  Object.keys(obj).forEach((key) => entity[key] = obj[key])
}

export const getMongoConnectionString = ({user, pass, host, port, database, authBase}): string => {
  return `mongodb://${user}:${pass}@${host}:${port}/${database}?authSource=${authBase}`;
}
