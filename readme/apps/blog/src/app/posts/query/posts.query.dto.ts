import { IsArray, IsBoolean, IsDate, IsMongoId, IsOptional, IsString, } from 'class-validator';
import { Expose } from 'class-transformer';
import {  SortByType, TitleDTO, PostTypeDTO, Property, APIOption, ValidateLength, PageDTO } from '@readme/core';
import { ApiPropertyOptional, IntersectionType, PartialType, PickType } from '@nestjs/swagger';

const { Tag, Subscribers, IsDraft, AuthorID, UserID, Since} = Property
const { PostProperty: Post } = APIOption

class QueryDTO {
  @Expose()
  @IsOptional()
  @ApiPropertyOptional(APIOption.PostProperty(Property.SortBy, {enum: SortByType, default: SortByType.Date}))
  public sortBy?: SortByType.Date | SortByType.Likes | SortByType.Comm = SortByType.Date

  @Expose()
  @IsString()
  @IsOptional()
  @ValidateLength()
  @ApiPropertyOptional(Post(Tag))
  public tag?: string;

  @Expose()
  @IsArray()
  @IsOptional()
  @ApiPropertyOptional(Post(Subscribers))
  public subs?: string[]

  @Expose()
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional(Post(IsDraft))
  public isDraft?: boolean;

  @Expose()
  @IsMongoId()
  @ApiPropertyOptional(Post(AuthorID))
  public authorID?: string;

  @Expose()
  @IsMongoId()
  @ApiPropertyOptional(Post(UserID))
  public userID?: string;

  @Expose()
  @IsDate()
  @ApiPropertyOptional(Post(Since))
  public since?: Date;
}

export class PostsFindQueryDTO extends IntersectionType(
  IntersectionType(TitleDTO, QueryDTO),
  IntersectionType(PageDTO, PartialType(PostTypeDTO))
) {}

export class PostsQueryDTO extends IntersectionType(
  PickType(QueryDTO, ['sortBy', 'isDraft', 'since'] as const),
  PageDTO
) {}


