import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { RDOBase, UserAPIDesc, UserAPIExample } from '@readme/shared-types';
import { Expose } from 'class-transformer';
import { UserCreateDTO } from '../dto/user-create.dto';

class Token {
  @ApiProperty({
    description: UserAPIDesc.Token,
    example: UserAPIExample.Token
  })
  @Expose()
  public accessToken: string;
}

class UserRDOBase extends IntersectionType(RDOBase, Token) {}

export class UserRDO extends IntersectionType(
  UserRDOBase,
  OmitType(
    UserCreateDTO,
    ['password'] as const
    )
) {}

