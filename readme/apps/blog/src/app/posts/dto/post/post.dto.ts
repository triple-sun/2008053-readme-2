import { ApiProperty, IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { ArrayMaxSize, IsArray, IsBoolean, IsDate, IsDefined, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { Entity, getOptions, PostProperty, Property, Size, ValidateLength } from "@readme/core";
import { ContentDTO } from "../content/content.dto";

export class Post {
  @Expose()
  @IsOptional()
  @Transform(({value}) => +value)
  public id?: number;

  @Expose()
  @IsDefined()
  public type: ContentType;

  @Expose()
  public isRepost?: boolean;

  @Expose()
  public isDraft?: boolean;

  @Expose()
  @IsMongoId()
  public authorID?: string;

  @Expose()
  @Transform(({value, obj}) => !value ? obj.postID ?? obj.id : value )
  @IsNumber()
  public originID?: number;

  @Expose()
  @IsArray()
  public tags?: string[];
}

export class PostIDDTO {
  @Expose()
  @Transform(({value}) => +value)
  @ApiProperty(getOptions(Entity.User, Property.Id))
  public id: number;
}

export class TagDTO {
  @Expose()
  @IsString()
  @ValidateLength()
  @ApiPropertyOptional(PostProperty(Property.Tag))
  public tag?: string;
}

export class PostTagsDTO extends PickType(Post, ['tags']) {
  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateLength({})
  @ArrayMaxSize(Size.Tags.Max)
  @Transform(({ value }) => value ? [... new Set(value.map((tag: string) => tag.toLowerCase()))] : [])
  @ApiPropertyOptional(PostProperty(Property.Tags, { maxItems: Size.Tags.Max }))
  public tags?: string[];
}

export class IsDraftDTO extends PickType(Post, ['isDraft'])  {
  @Expose()
  @IsString()
  @Transform(({value}) => ContentType[value.toUpperCase()])
  @ApiProperty(PostProperty(Property.IsDraft, {default: false}))
  public IsDraft: boolean;
}

export class TypeDTO extends PickType(Post, ['type'])  {
  @Expose()
  @IsString()
  @Transform(({value}) => ContentType[value.toUpperCase()])
  @ApiProperty(PostProperty(Property.Type, {name: Property.Type, enum: ContentType }))
  public type: ContentType;
}

export class AuthorIDDTO extends PickType(Post, ['authorID'])  {
  @Expose()
  @IsMongoId()
  @ApiProperty(PostProperty(Property.AuthorID))
  public authorID: string;
}

export class PublishAtDTO {
  @Expose()
  @IsDate()
  @IsOptional()
  @ApiPropertyOptional(PostProperty(Property.PublishAt))
  publishAt?: Date;
}

export class SinceDTO {
  @Expose()
  @IsDate()
  @IsOptional()
  @ApiProperty(PostProperty(Property.Since))
  since: Date;
}

export class PostCreateDTO extends IntersectionType(
  PostTagsDTO,
  IntersectionType(ContentDTO, TypeDTO)
) {}


export class PostToggleDTO {
  @Expose()
  @IsOptional()
  @IsBoolean()
  @ApiProperty(PostProperty(Property.IsDraft, {default: false}))
  public isDraft?: boolean

  @Expose()
  @IsOptional()
  @IsBoolean()
  @ApiProperty(PostProperty(Property.IsRepost, {default: false}))
  public isRepost?: boolean
}

export class PostUpdateDTO extends IntersectionType(
  PartialType(
    IntersectionType(
      PostTagsDTO, PostToggleDTO
      )
    ),
  PartialType(
    IntersectionType(
      PostCreateDTO, PublishAtDTO
    )
)) {}
