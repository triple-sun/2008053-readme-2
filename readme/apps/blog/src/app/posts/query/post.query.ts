import { IsArray, IsBoolean, IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ContentType } from '@prisma/client';
import { POST_DEFAULT_LIMIT, POST_DEFAULT_SORT_BY_TYPE, POST_DEFAULT_SORT_TYPE, SORT_BY_TYPES, SORT_TYPES } from '../post.const';
import { SortByType, SortType } from '../post.enum';

export class PostQuery {
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  @IsArray()
  public users?: string[];

  @Transform(({ value } ) => +value || POST_DEFAULT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = POST_DEFAULT_LIMIT;

  @IsEnum(ContentType)
  @IsOptional()
  public type?: ContentType;

  @IsIn(SORT_BY_TYPES)
  @IsOptional()
  public sortBy: SortByType.Date | SortByType.Likes | SortByType.Comm = POST_DEFAULT_SORT_BY_TYPE

  @IsIn(SORT_TYPES)
  @IsOptional()
  public sort: SortType.Desc | SortType.Asc = POST_DEFAULT_SORT_TYPE;

  @IsString()
  @IsOptional()
  public tag?: string;

  @IsBoolean()
  @IsOptional()
  public draft: false;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
