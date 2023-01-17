import { IsArray, IsBoolean, IsEnum, IsMongoId, IsOptional, IsString, Length, } from 'class-validator';
import { Expose } from 'class-transformer';
import { MinMax, PageQuery, PostAPIProp, Post, SortDefault, SortByType, TitleDTO } from '@readme/core';
import { ApiProperty, IntersectionType, PartialType, PickType } from '@nestjs/swagger';

class PostsBaseQuery {
  @IsOptional()
  @IsEnum(SortByType)
  public sortBy?: SortByType.Date | SortByType.Likes | SortByType.Comm = SortDefault.PostSortBy

  @IsString()
  @IsOptional()
  @Length(MinMax.TagMin, MinMax.TagMax)
  @ApiProperty(PostAPIProp.Tags)
  public tag?: string;

  @IsArray()
  @IsOptional()
  public subs?: string[]

  @Expose()
  @IsOptional()
  @IsBoolean()
  @ApiProperty(PostAPIProp.IsDraft)
  public isDraft?: boolean;

  @Expose()
  @IsMongoId()
  @ApiProperty(PostAPIProp.AuthorID)
  public authorID?: string;

  @Expose()
  @IsMongoId()
  @ApiProperty(PostAPIProp.UserID)
  public userID?: string;

  public since?: Date;
}

export class PostsFindQuery extends IntersectionType(
  IntersectionType(TitleDTO, PostsBaseQuery),
  IntersectionType(PageQuery, PartialType(PickType(Post, ['type'] as const)))
) {}

export class PostsQuery extends IntersectionType(
  PickType(PostsBaseQuery, ['sortBy', 'isDraft', 'since'] as const),
  PageQuery
) {}


