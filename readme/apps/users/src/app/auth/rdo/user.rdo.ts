import { ApiProperty } from '@nestjs/swagger';
import { Field } from '@readme/core';
import {Expose} from 'class-transformer';
import { APIDesc, APIExample } from '../auth.enum';

export class UserRDO {
  @ApiProperty({
    description: APIDesc.ID,
    example: APIExample.ID
  })
  @Expose({ name: Field.ObjectID})
  public id: string;

  @ApiProperty({
    description: APIDesc.Avatar,
    example: APIExample.Avatar
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: APIDesc.Email,
    example: APIExample.Email
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: APIDesc.Name,
    example: APIExample.Name
  })
  @Expose()
  public name: string;
}
