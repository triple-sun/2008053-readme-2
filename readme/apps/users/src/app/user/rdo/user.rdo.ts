import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { KeyName } from '@readme/core';
import { UserAPIDesc, UserAPIExample } from '@readme/shared-types';
import { Expose } from 'class-transformer';
import { UserCreateDTO } from '../dto/user-create.dto';

class UserRDOBase {
  @ApiProperty({
    description: UserAPIDesc.ID,
    example: UserAPIExample.ID
  })
  @Expose({ name: KeyName.ObjectID})
  public id: string;

  @ApiProperty({
    description: UserAPIDesc.Token,
    example: UserAPIExample.Token
  })
  @Expose()
  public accessToken: string;
}

export class UserRDO extends IntersectionType(
  UserRDOBase,
  OmitType(
    UserCreateDTO,
    ['password'] as const
  )
) {}

