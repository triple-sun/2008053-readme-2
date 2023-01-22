import { ApiExtraModels, ApiProperty, IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsBoolean, IsDate, IsDefined, IsMongoId, IsNumber, IsOptional, IsString, MaxLength, ValidateIf, ValidateNested } from "class-validator";
import { Entity, getOptions, PostProperty, Property, Size, ValidateLength } from "@readme/core";

import { ClassForType } from "../../post.const";
import { LinkDTO } from "../content/link.dto";
import { VideoDTO } from "../content/video.dto";
import { QuoteDTO } from "../content/quote.dto";
import { TextDTO } from "../content/text.dto";
import { PhotoDTO } from "../content/photo.dto";

@ApiExtraModels(LinkDTO, VideoDTO, QuoteDTO, TextDTO, PhotoDTO)
export class ContentDTO {
  @Expose()
  @ValidateNested()
  @Type(({object}) => ClassForType.DTO[object.type])
  @ApiProperty(PostProperty(Property.Content))
  public content: LinkDTO | VideoDTO | QuoteDTO | TextDTO | PhotoDTO
}

export class PostIDDTO {
  @Expose({name: Property.Id})
  @Transform(({value}) => +value)
  @ApiProperty(getOptions(Entity.User, Property.Id))
  public postId: number;

  @Exclude()
  public id?: number;
}

export class TagDTO {
  @Expose()
  @IsString()
  @ValidateLength()
  @ApiPropertyOptional(PostProperty(Property.Tag))
  public tag?: string;
}

export class PostTagsDTO {
  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateLength({})
  @ArrayMaxSize(Size.Tags.Max)
  @Transform(({ value }) => value ? [...(new Set(
    value.map((tag: string) => tag.toLowerCase())
  ))] : [])
  @ApiPropertyOptional(PostProperty(Property.Tags, { maxItems: Size.Tags.Max }))
  public tags?: string[];
}

export class IsDraftDTO {
  @Expose()
  @IsString()
  @Transform(({value}) => ContentType[value.toUpperCase()])
  @ApiProperty(PostProperty(Property.IsDraft, {default: false}))
  public isDraft: boolean;
}

export class AuthorIDDTO {
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

export class PostCreateDTO extends IntersectionType(ContentDTO, PostTagsDTO) {}

export class PostUpdateDTO extends IntersectionType(
  PartialType(PostCreateDTO), IntersectionType(PublishAtDTO, PostToggleDTO)
) {}
