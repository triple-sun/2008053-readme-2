import { Expose } from 'class-transformer';
import { ApiPropertyOptional, getSchemaPath, IntersectionType, PartialType, } from '@nestjs/swagger';
import { PostProperty, Property, SortByType, UserIDDTO } from '@readme/core';
import { AuthorIDDTO, IsDraftDTO, SinceDTO, TagDTO } from '../dto/post/post.dto';
import { PageDTO } from '../dto/page.dto';
import { TitleDTO } from '../dto/content/title.dto';
import { IsString } from 'class-validator';
import { TypeDTO } from '../dto/content/type.dto';

export class SubsDTO {
  @Expose()
  @ApiPropertyOptional(PostProperty(Property.Subscribers))
  public subs?: string[]

}

class SearchQueryDTO extends PartialType(
  IntersectionType(
    IntersectionType(TitleDTO, IntersectionType(TagDTO,AuthorIDDTO)),
    IntersectionType(UserIDDTO, IntersectionType(SubsDTO, TypeDTO))
  )
) {}

export class SearchDTO extends TitleDTO {
  @Expose({ name: Property.Search })
  @IsString()
  public title: string;
}

export class PostsQueryDTO extends PartialType(IntersectionType(SinceDTO, IntersectionType(IsDraftDTO, PageDTO))) {
  @Expose()
  @ApiPropertyOptional(PostProperty(Property.SortBy, { name: Property.SortBy, enum: SortByType, default: SortByType.Date}))
  public sortBy?: SortByType.Date | SortByType.Likes | SortByType.Comm = SortByType.Date


  @Expose()
  @ApiPropertyOptional(PostProperty(Property.Search, {
    oneOf:[
      { $ref: getSchemaPath(TitleDTO) },
      { $ref: getSchemaPath(TagDTO) },
      { $ref: getSchemaPath(UserIDDTO) },
      { $ref: getSchemaPath(TypeDTO) },
      { $ref: getSchemaPath(AuthorIDDTO) },
      { $ref: getSchemaPath(SubsDTO) }
    ]
  }))
  public searchFor?: SearchQueryDTO
}
