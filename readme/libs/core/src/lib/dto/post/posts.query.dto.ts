import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, getSchemaPath, IntersectionType, PartialType, } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';

import { UserIDDTO } from '../user/user.dto';
import { PostProperty } from '../../utils/api.utils';
import { Property } from '../../enum/property.enum';
import { SortByType } from '../../enum/utils.enum';
import { Title } from '../content.dto';
import { Size } from '../../utils/size.utils';
import { ValidateLength } from '../../decorator/validate-length.decorator';
import { IsDate, IsMongoId, IsOptional, IsString, ValidateIf } from 'class-validator';

export class IsDraftDTO {
  @Expose()
  @IsString()
  @Transform(({value}) => ContentType[value.toUpperCase()])
  @ApiProperty(PostProperty(Property.IsDraft, {default: false}))
  public isDraft: boolean;
}

export class PublishAtDTO {
  @Expose()
  @IsDate()
  @IsOptional()
  @ApiPropertyOptional(PostProperty(Property.PublishAt))
  public publishAt?: Date;
}

export class SinceDTO {
  @Expose()
  @IsDate()
  @IsOptional()
  @ApiProperty(PostProperty(Property.Since))
  public since: Date;
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
  @ApiPropertyOptional(PostProperty(Property.Tag))
  public tag?: string;
}

export class TypeDTO {
  @Expose()
  @Transform(({value}) => ContentType[value.toUpperCase()])
  @ApiProperty(PostProperty(Property.Type, {name: Property.Type, enum: ContentType }))
  public type: ContentType;
}

export class SubsDTO {
  @Expose()
  @ValidateIf(({value}) => value.length > 0)
  @IsMongoId({each: true})
  @ApiPropertyOptional(PostProperty(Property.Subscribers))
  public subs?: string[]
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
    IntersectionType(UserIDDTO, IntersectionType(SubsDTO,TypeDTO))
  )
) {}

export class PostsQueryDTO extends PartialType(IntersectionType(SinceDTO, IntersectionType(IsDraftDTO, PageDTO))) {
  @Expose({ name: Property.UserId })
  @Type(() => String)
  @Transform(({value}) => value.toString())
  public userId: string

  @Expose()
  @ApiPropertyOptional(PostProperty(Property.SortBy, { name: Property.SortBy, enum: SortByType, default: SortByType.Date}))
  public sortBy?: SortByType.Date | SortByType.Likes | SortByType.Comm = SortByType.Date

  @Expose()
  @ApiPropertyOptional(PostProperty(Property.SearchFor, {
    oneOf:[
      { $ref: getSchemaPath(SearchDTO) },
      { $ref: getSchemaPath(TagDTO) },
      { $ref: getSchemaPath(UserIDDTO) },
      { $ref: getSchemaPath(TypeDTO) },
      { $ref: getSchemaPath(AuthorIDDTO) },
      { $ref: getSchemaPath(SubsDTO) }
    ]
  }))
  public searchFor?: SearchQueryDTO
}
