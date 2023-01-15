import { IsArray, IsBoolean, IsDate, IsEnum, IsInt, IsOptional, IsString, Length, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { FieldName, MinMax, PageQuery, PostAPIProp, PostDTO, Sort, SortByType, SortType, UserIDQuery } from '@readme/core';
import { ApiProperty, IntersectionType, PartialType, PickType } from '@nestjs/swagger';

class PostsFeedBaseQuery {
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  public from?: string[];

  @IsInt()
  @IsOptional()
  @Max(MinMax.PostsLimit)
  @Transform(({ value } ) => +value || MinMax.PostsLimit)
  @ApiProperty(PostAPIProp[FieldName.Limit])
  public limit? = MinMax.PostsLimit;

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

  @IsBoolean()
  @IsOptional()
  public isDraft?: false;

  @IsDate()
  @IsOptional()
  public since?: Date;
}

export class PostFeedQuery extends IntersectionType(
  PostsFeedBaseQuery,
  IntersectionType(
    PageQuery,
    IntersectionType(
      UserIDQuery,
      PartialType(PickType(PostDTO, ['type'] as const)),
    )
  )
) {}
