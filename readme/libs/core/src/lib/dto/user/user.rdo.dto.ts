import { IsDate, IsEmail, IsInt, IsJWT, IsMongoId, IsString, ValidateIf } from 'class-validator';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IntersectionType, PickType } from '@nestjs/swagger';

import { UserError } from '../../const/error.const';
import { Property } from '../../enum/property.enum';
import { ObjectId } from 'mongoose';

export class UserRDO {
  @Expose({ name: Property.ObjectID})
  @IsMongoId()
  @Transform(({obj}) => obj._id)
  public id: string

  @Expose()
  @IsEmail({},{ message: UserError.Email.Invalid } )
  @IsString()
  public email: string

  @Exclude()
  public password: string

  @Expose()
  @IsString()
  public name: string

  @Expose()
  @IsString()
  public avatarLink?: string;

  @Expose({ name: Property.CreatedAt })
  @IsDate()
  @Type(() => Date)
  @Transform(({obj}) => obj.createdAt)
  public registeredAt: Date;

  @Expose()
  @IsDate()
  @Type(() => Date)
  public notifiedAt: Date;

  @Expose()
  @IsInt({each: true})
  public posts: number[];

  @Expose()
  @ValidateIf(o => o.subscribers.length > 0)
  @IsMongoId({each: true})
  public subscribers: ObjectId[];

  @Expose()
  @ValidateIf(o => o.subscriptions.length > 0)
  @IsMongoId({each: true})
  public subscriptions: ObjectId[];

  @Expose()
  @IsInt()
  public postsCount: number;

  @Expose()
  @IsInt()
  public subscribersCount: number;
}

export class TokenDTO extends UserRDO {
  @Expose()
  @IsJWT()
  public token: string;
}

export class UserLoggedRDO extends IntersectionType(
  PickType(UserRDO, ['email', 'id', 'name'] as const),
  TokenDTO
  ) {}

