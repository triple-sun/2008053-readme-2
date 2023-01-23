import { RpcException } from '@nestjs/microservices';
import { plainToInstance, ClassConstructor } from 'class-transformer';
export const fillObject = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const toggleArrElement = <T>(array: T[], value: T) => array.indexOf(value) === -1 ? [...array, value] : array.slice(array.indexOf(value), 0)

export const capitalize = (str: string) => str.toString().charAt(0).toUpperCase() + str.slice(1);

export const mapArrToObject = <T, V>(arr: T[], mapFn: (item: T) => V) => Object.fromEntries(new Map(arr.map((item) => [item, mapFn(item)])))

export const handleRpcExchange = async (value) => {
  const response = await value

  if (response.error) {
    throw new RpcException(response.error)
  }

  return response
}
