import { ApiProperty } from '@nestjs/swagger';
import { KeyName } from '@readme/core';
import {Expose} from 'class-transformer';
import { APIDesc, APIExample } from '../../auth/auth.enum';

export class UserLoggedRDO {
  @ApiProperty({
    description: APIDesc.ID,
    example: APIExample.ID
  })
  @Expose({ name: KeyName.ObjectID })
  public id: string;

  @ApiProperty({
    description: APIDesc.Email,
    example: APIExample.Email
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: APIDesc.Token,
    example: APIExample.Token
  })
  @Expose()
  public accessToken: string;
}
