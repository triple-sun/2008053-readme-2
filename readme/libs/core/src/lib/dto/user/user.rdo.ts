import { IsArray, IsDate, IsMongoId, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { User } from './user.dto';
import { Property } from '../../enum/property.enum';

const { ObjectID, CreatedAt  } = Property

export class UserRDO extends User {
  @Expose({ name: ObjectID})
  @IsMongoId()
  @Transform(({obj}) => obj._id)
  public id: string

  @Expose()
  public email: string

  @Expose()
  public name: string

  @Expose({ name: CreatedAt})
  @IsDate()
  @Type(() => Date)
  public registeredAt: Date;

  @Expose()
  @ValidateIf(o => o.posts.length > 0)
  @IsNumber({}, {each: true})
  public posts: number[];

  @Expose()
  @ValidateIf(o => o.subscribers.length > 0)
  @IsMongoId({each: true})
  public subscribers: string[];

  @Expose()
  @ValidateIf(o => o.subscriptions.length > 0)
  @IsArray()
  @IsMongoId({each: true})
  public subscriptions: string[];

  @Expose()
  @ValidateIf(o => o.posts.length > 0)
  @IsOptional()
  @Transform(({obj}) => obj.posts ? obj.posts.length : 0)
  public postsCount: number;

  @Expose()
  @ValidateIf(o => o.subscribers.length > 0)
  @Transform(({obj}) => obj.subscribers ? obj.subscribers.length : 0)
  public subscribersCount: number;

  @Expose()
  @IsString()
  public avatarLink?: string;
}
