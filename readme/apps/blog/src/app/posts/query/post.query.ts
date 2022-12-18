import { IsArray, IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, Length, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ContentType } from '@prisma/client';
import { MinMax, Default, SortByType, SortType } from '@readme/core';

export class PostQuery {
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  public users?: string[];

  @IsInt()
  @IsOptional()
  @Max(Default.PostLimit)
  @Transform(({ value } ) => +value || Default.PostLimit)
  public limit? = Default.PostLimit;

  @IsOptional()
  @IsEnum(ContentType)
  public type?: ContentType;

  @IsOptional()
  @IsEnum(SortByType)
  public sortBy?: SortByType.Date | SortByType.Likes | SortByType.Comm = Default.PotSortBy

  @IsOptional()
  @IsEnum(SortType)
  public sort?: SortType.Desc | SortType.Asc = Default.PostSort;

  @IsString()
  @IsOptional()
  @Length(MinMax.TagMin, MinMax.TagMax)
  public tag?: string;

  @IsBoolean()
  @IsOptional()
  public draft?: false;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  public page?: number;
}
