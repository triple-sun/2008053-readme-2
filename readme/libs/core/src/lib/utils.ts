import {plainToInstance, ClassConstructor} from 'class-transformer';

export const fillObject = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export const fillEntity = <T, V>(obj: T, entity: V) => {
  Object.keys(obj).forEach((key) => entity[key] = obj[key])
}

export const toggleArrayElement = <T>(arr: T[] | undefined, item: T) => arr.includes(item) ? arr.filter(i => i !== item) : [ ...arr, item ];
