import { IsArray, IsBoolean, IsEnum, IsMongoId, IsOptional, IsString, Length, } from 'class-validator';
import { Expose } from 'class-transformer';
import { PageQuery, SortDefault, SortByType, TitleDTO, PostTypeDTO, APIProp, Property, Size } from '@readme/core';
import { ApiProperty, IntersectionType, PartialType, PickType } from '@nestjs/swagger';

const { Min, Max } = Size;
const { Tag, Subscribers, IsDraft, AuthorID, UserID, Since} = Property
const { Post } = APIProp

class PostsBaseQuery {
  @Expose()
  @IsOptional()
  @IsEnum(SortByType)
  public sortBy?: SortByType.Date | SortByType.Likes | SortByType.Comm = SortDefault.PostSortBy

  @Expose()
  @IsString()
  @IsOptional()
  @Length(Min(Tag), Max(Tag))
  @ApiProperty(Post(Tag))
  public tag?: string;

  @Expose()
  @IsArray()
  @IsOptional()
  @ApiProperty(Post(Subscribers))
  public subs?: string[]

  @Expose()
  @IsOptional()
  @IsBoolean()
  @ApiProperty(Post(IsDraft))
  public isDraft?: boolean;

  @Expose()
  @IsMongoId()
  @ApiProperty(Post(AuthorID))
  public authorID?: string;

  @Expose()
  @IsMongoId()
  @ApiProperty(Post(UserID))
  public userID?: string;

  @Expose()
  @ApiProperty(Post(Since))
  public since?: Date;
}

export class PostsFindQuery extends IntersectionType(
  IntersectionType(TitleDTO, PostsBaseQuery),
  IntersectionType(PageQuery, PartialType(PostTypeDTO))
) {}

export class PostsQuery extends IntersectionType(
  PickType(PostsBaseQuery, ['sortBy', 'isDraft', 'since'] as const),
  PageQuery
) {}


