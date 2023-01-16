import { IsDate, IsMongoId } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { ApiProperty, IntersectionType, OmitType, PickType } from '@nestjs/swagger';
import { FieldName, User, UsersAPIProp } from '@readme/core';
import { Types } from 'mongoose';

class UserBaseRDO {
  @Expose({ name: FieldName.ObjectID})
  @IsMongoId()
  @Transform(({ obj }) => obj._id)
  @ApiProperty(UsersAPIProp[FieldName.ID])
  public id: Types.ObjectId

  @Expose()
  @IsDate()
  @ApiProperty(UsersAPIProp[FieldName.CreatedAt])
  public createdAt: Date;
}

export class UserRDO extends IntersectionType(
  UserBaseRDO,
  IntersectionType(
    PickType(User, ['posts', 'subscribers'] as const),
    OmitType(User, ['password', 'token'] as const))
) {}

