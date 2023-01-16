import { IsDate, IsMongoId } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { ApiProperty, IntersectionType, OmitType, PickType } from '@nestjs/swagger';
import { FieldName, UserData, UsersAPIProp } from '@readme/core';
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
    PickType(UserData, ['posts', 'subscribers'] as const),
    OmitType(UserData, ['password', 'token'] as const))
) {}

