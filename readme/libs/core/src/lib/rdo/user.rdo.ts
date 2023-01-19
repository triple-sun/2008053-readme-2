import { IsArray, IsDate, IsEmail, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { Property } from '../enum/property.enum';

const { ObjectID, CreatedAt } = Property

export class UserRDO {
  @Expose({ name: ObjectID})
  @IsMongoId()
  @Transform(({ obj }) => obj._id)
  public id: string

  @Expose()
  @IsEmail()
  public email: string

  @Expose()
  @IsString()
  public name: string

  @Expose({ name: CreatedAt})
  @IsDate()
  @Type(() => Date)
  public registeredAt: Date;

  @Expose()
  @IsArray()
  @IsNumber({}, {each: true})
  @Transform(({ value }) => value.length)
  public posts: number;

  @Expose()
  @IsArray()
  @IsOptional({each: true})
  @IsMongoId({each: true})
  @Transform(({ value }) => value.length)
  public subscribers: number;

  @Expose()
  @IsArray()
  @IsOptional({each: true})
  @IsMongoId({each: true})
  public subscriptions: string[];

  @Expose()
  @IsString()
  public avatar?: string;
}
