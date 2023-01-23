import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, getSchemaPath, IntersectionType, PartialType, } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';

import { UserIdDTO, UserIDDTO } from '../user/user.dto';
import { PostProperty } from '../../utils/api.utils';
import { Property } from '../../enum/property.enum';
import { QueryType, SortByType } from '../../enum/utils.enum';
import { Title } from '../content.dto';
import { Size } from '../../utils/size.utils';
import { ValidateLength } from '../../decorator/validate-length.decorator';
import { IsBoolean, IsDate, IsDefined, IsMongoId, IsOptional, ValidateIf } from 'class-validator';
import { fillObject } from '../../utils/common.utils';
import { Query } from '@nestjs/common';

export class PublishAtDTO {
  @Expose()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiPropertyOptional(PostProperty(Property.PublishAt))
  public publishAt?: Date;
}

export class CreatedAtDTO {
  @Expose()
  @IsDate()
  @IsOptional()
  @ApiProperty(PostProperty(Property.Since))
  public createdAt?: Date;
}

export class AuthorIDDTO {
  @Expose()
  @IsMongoId()
  @ApiProperty(PostProperty(Property.AuthorId))
  public authorId: string;
}

export class TagDTO {
  @Expose()
  @ValidateLength()
  @Transform(({ value }) => value.toLowerCase())
  @ApiPropertyOptional(PostProperty(Property.Tag))
  public tag?: string;
}

export class TypeDTO {
  @Expose()
  @Transform(({value}) => ContentType[value.toUpperCase()])
  @ApiProperty(PostProperty(Property.Type, {name: Property.Type, enum: ContentType }))
  public type: ContentType;
}

export class FeedDTO extends IntersectionType(UserIDDTO, CreatedAtDTO) {
  @Expose()
  @ValidateIf(({value}) => value.length > 0)
  @IsMongoId({each: true})
  @ApiPropertyOptional(PostProperty(Property.Subscribers))
  public subs: string[]
}

export class PageDTO {
  @Expose()
  @Transform(({value}) => +value)
  @ApiPropertyOptional(PostProperty(Property.Page))
  public page?: number;
}

export class SearchDTO extends Title {
  @Expose()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Title, {minLength: Size.Title.Min, maxLength: Size.Title.Max}))
  public title?: string;
}

export class SearchQueryDTO extends PartialType(
  IntersectionType(
    IntersectionType(SearchDTO, IntersectionType(TagDTO, AuthorIDDTO)),
    IntersectionType(UserIDDTO, IntersectionType(FeedDTO, TypeDTO))
  )
) {}


export class SearchFor extends PartialType(IntersectionType(IntersectionType(SearchDTO, IntersectionType(TagDTO, AuthorIDDTO)), IntersectionType(UserIdDTO, IntersectionType(FeedDTO,TypeDTO)))) {}

export class PostsQueryDTO extends PageDTO {
  @IsDefined()
  @ApiProperty({enum: QueryType, name: 'QueryType'})
  public type: QueryType;

  @Expose()
  @ApiPropertyOptional(PostProperty(Property.SortBy, { name: Property.SortBy, enum: SortByType, default: SortByType.Date}))
  public sortBy?: SortByType.Date | SortByType.Likes | SortByType.Comm = SortByType.Date

  @ValidateIf(o => o.type && o.searchFor)
  public searchFor: SearchFor

  @Expose()
  @IsOptional()
  @IsDate()
  public since?: Date

  @IsOptional()
  @IsBoolean()
  public isDraft?: boolean
}


export class PostsFullQueryDTO<T extends SearchFor> extends PostsQueryDTO {
  @Expose()
  @ValidateIf(o => o.type && o.searchFor)
  @ApiPropertyOptional(PostProperty(Property.SearchFor, {
    oneOf:[
      { $ref: getSchemaPath(SearchDTO)},
      { $ref: getSchemaPath(TagDTO)},
      { $ref: getSchemaPath(UserIDDTO)},
      { $ref: getSchemaPath(TypeDTO)},
      { $ref: getSchemaPath(AuthorIDDTO)},
      { $ref: getSchemaPath(FeedDTO) }
    ]
  }))
  public searchFor: T
}

export const DTOForQuery = (query: PostsQueryDTO) => {
 switch(query.type) {
    case QueryType.AuthorId:
      return fillObject(PostsFullQueryDTO<AuthorIDDTO>, query)
    case QueryType.Type:
      return fillObject(PostsFullQueryDTO<TypeDTO>, query)
    case QueryType.Feed:
      return fillObject(PostsFullQueryDTO<FeedDTO>, query)
    case QueryType.Tag:
      return fillObject(PostsFullQueryDTO<TagDTO>, query)
    case QueryType.Search:
      return fillObject(PostsFullQueryDTO<SearchDTO>, query)
    case QueryType.UserId:
      return fillObject(PostsFullQueryDTO<UserIdDTO>, query)
 }
}

export const DTOForSearch = <T extends SearchFor> ({searchFor: {title, authorId, type, subs, userId, tag}}: PostsFullQueryDTO<T> ) => ({
  [QueryType.AuthorId]: { authorId: { equals: authorId }},
  [QueryType.Feed]: { userId: { in: subs }},
  [QueryType.Tag]: { tags: { has: tag }},
  [QueryType.Search]:  { title: { contains: title }},
  [QueryType.UserId]:  { userId: { equals:userId }},
  [QueryType.Type]: { type: { equals: type} }
})
