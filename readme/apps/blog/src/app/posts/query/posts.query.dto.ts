import { IsArray, IsBoolean, IsEnum, IsMongoId, IsOptional, IsString, Length, } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { FieldName, MinMax, PageQuery, PostAPIProp, Post, Sort, SortByType, SortType, Title } from '@readme/core';
import { ApiProperty, IntersectionType, PartialType, PickType } from '@nestjs/swagger';

class PostsBaseQuery {
  @IsOptional()
  @IsEnum(SortByType)
  public sortBy?: SortByType.Date | SortByType.Likes | SortByType.Comm = Sort.PotSortBy

  @IsOptional()
  @IsEnum(SortType)
  public sort?: SortType.Desc | SortType.Asc = Sort.PostSort;

  @IsString()
  @IsOptional()
  @Length(MinMax.TagMin, MinMax.TagMax)
  @ApiProperty(PostAPIProp[FieldName.Tag])
  public tag?: string;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  public subs?: string[]

  @Expose()
  @IsBoolean()
  @ApiProperty(PostAPIProp.IsDraft)
  public isDraft?: boolean;

  @Expose()
  @IsMongoId()
  @ApiProperty(PostAPIProp[FieldName.AuthorID])
  public authorID?: string;

  public since?: Date;
}

export class PostsFindQuery extends IntersectionType(
  IntersectionType(Title, PostsBaseQuery),
  IntersectionType(PageQuery, PartialType(PickType(Post, ['type'] as const)))
) {}

export class PostsQuery extends IntersectionType(
  PickType(PostsBaseQuery, ['sort', 'sortBy', 'isDraft', 'since'] as const),
  PageQuery
) {}


