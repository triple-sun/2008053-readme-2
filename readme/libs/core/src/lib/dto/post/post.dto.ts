import { ApiExtraModels, ApiProperty, IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsBoolean, IsInt, IsMongoId, IsOptional, IsString, IsUrl, Matches, MaxLength, ValidateIf, ValidateNested } from "class-validator";

import { Property } from "../../enum/property.enum";
import { CommentProperty, PostProperty } from "../../utils/api.utils";
import { Size } from "../../utils/size.utils";
import { ValidateLength } from "../../decorator/validate-length.decorator";
import { Entity } from "../../enum/utils.enum";
import { getOptions } from "../../utils/schema.utils";
import { PageDTO, PublishAtDTO, TypeDTO } from "./posts.query.dto";
import { IMAGE_MIME_TYPES, YoutubeLinkRegExp } from "../../const/utils.const";
import { Photo, Quote, Title } from "../content.dto";
import { LengthError } from "../../const/error.const";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";
import { UserIDDTO } from "../user/user.dto";
import { IPost } from "@readme/shared-types";

export class PostID  {
  @Expose({ name: Property.Id})
  @Transform(({value}) => +value)
  public id: number
}

export class TitleDTO extends Title {
  @Expose()
  @ValidateLength()
  @ValidateIf(o => o.type === ( ContentType.TEXT || ContentType.VIDEO ))
  @ApiProperty(PostProperty(Property.Title, {minLength: Size.Title.Min, maxLength: Size.Title.Max}))
  public title: string;
}

export class LinkDTO {
  @Expose()
  @ValidateIf(o => o.type === ContentType.LINK)
  @MaxLength(Size.Desc.Max, { message: LengthError })
  @ApiPropertyOptional(PostProperty(Property.Desc, { default: '' }))
  public desc?: string;

  @Expose()
  @IsUrl()
  @ValidateIf(o => o.type === ContentType.LINK)
  @ApiProperty(PostProperty(Property.WebLink))
  public webLink: string;
}

export class PhotoDTO extends PickType(Photo, ['photo']) {
  @ValidateIf(o => o.type === ContentType.PHOTO)
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(IMAGE_MIME_TYPES)
  @ApiPropertyOptional(PostProperty(Property.Avatar, {type: 'string', format: 'binary'}))
  @Transform(({obj, value}) => obj.photoLink = value.path)
  public photo: FileSystemStoredFile

  @Expose()
  @ValidateIf(o => o.type === ContentType.PHOTO)
  @Transform(({obj}) => obj.photoLink = obj.photo.path)
  public photoLink: string;
}

export class QuoteDTO extends Quote {
  @Expose()
  @ValidateIf(o => o.type === ContentType.QUOTE)
  @IsString()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Quote, {minLength: Size.Quote.Min, maxLength: Size.Quote.Max}))
  public quote: string;

  @Expose()
  @ValidateIf(o => o.type === ContentType.QUOTE)
  @IsString()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Author, {minLength: Size.Author.Min, maxLength: Size.Author.Max}))
  public author: string;
}

export class TextDTO extends TitleDTO {
  @Expose()
  @ValidateIf(o => o.type === ContentType.TEXT)
  @IsString()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Ann, {minLength: Size.Ann.Min, maxLength: Size.Ann.Max}))
  public ann: string;

  @Expose()
  @IsString()
  @ValidateLength()
  @ApiProperty(PostProperty(Property.Text, {minLength: Size.Ann.Min, maxLength: Size.Ann.Max}))
  public text: string;
}

export class VideoDTO extends TitleDTO {
  @Expose()
  @ValidateIf(o => o.type === ContentType.VIDEO)
  @Matches(YoutubeLinkRegExp)
  @ApiProperty(PostProperty(Property.VideoLink))
  public videoLink?: string;

  @ValidateIf(o => o.type === ContentType.VIDEO)
  public title: string;
}

export class ContentDTO extends TypeDTO {
  @Expose()
  @ValidateNested()
  @Type(({object}) => DTOForType[object.type])
  @ApiProperty(PostProperty(Property.Content))
  public content: LinkDTO | VideoDTO | QuoteDTO | TextDTO | PhotoDTO
}

export class PostIDDTO {
  @Expose({ name: Property.Id})
  @Transform(({value}) => +value)
  @ApiProperty(getOptions(Entity.Post, Property.Id))
  public postId: number;
}

export class PostTagsDTO {
  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateLength()
  @ArrayMaxSize(Size.Tags.Max)
  @Transform(({ value }) => value ? [...(new Set(
    value.map((tag: string) => tag.toLowerCase())
  ))] : [])
  @ApiPropertyOptional(PostProperty(Property.Tags, { maxItems: Size.Tags.Max }))
  public tags?: string[];
}

export class PostToggleDTO {
  @Expose()
  @IsOptional()
  @IsBoolean()
    @Transform(({value}) => !!value)
  @ApiProperty(PostProperty(Property.IsDraft, {default: false}))
  public isDraft?: boolean

  @Expose()
  @IsOptional()
  @IsBoolean()
  @Transform(({value}) => !!value)
  @ApiProperty(PostProperty(Property.IsRepost, {default: false}))
  public isRepost?: boolean
}

export class PostCreateDTO extends IntersectionType(ContentDTO, PostTagsDTO) {}

export class PostUpdateDTO extends PartialType(IntersectionType(
  PostCreateDTO, PublishAtDTO
)) {}

export class CommentIDDTO {
  @Expose()
  @Transform(({value}) => +value)
  public commentId: number;
}

export class CommentTextDTO {
  @Expose()
  @ValidateLength()
  @ApiProperty(CommentProperty(Property.Comment))
  public comment: string;
}

export class CommentRDO extends IntersectionType(CommentTextDTO, IntersectionType(PickType(UserIDDTO, ['userId'] as const), PostIDDTO)) {
  @Expose()
  @Transform(({value, obj}) => value ?? +obj.id)
  public commentId: number;

  @Exclude()
  public id: number
}

export class CommentCreateDTO extends PickType(CommentRDO, ['comment', 'postId', 'userId']) {
  @ValidateLength()
  @ApiProperty(CommentProperty(Property.Comment))
  public comment: string

  @ApiProperty(CommentProperty(Property.Comment))
  public userId: string

  @ApiProperty(CommentProperty(Property.Comment))
  public postId: number
}

export class CommentsDTO extends IntersectionType(
  PostIDDTO,
  PageDTO
) {}

export class ContentRDO extends IntersectionType(
  IntersectionType(VideoDTO, TextDTO),
  IntersectionType( QuoteDTO, IntersectionType(LinkDTO, PhotoDTO))
) {}

export class PostAddRDO {
  @Expose()
  @IsBoolean()
  public isRepost: boolean;

  @Expose()
  @IsBoolean()
  public isDraft: boolean;

  @Expose()
  @IsMongoId()
  public authorID: string;

  @Expose()
  @IsInt()
  public originID: number;

  @Expose()
  @Transform(({value}) => value ?? [])
  public comments: number[];

  @Expose()
  @Transform(({ value }) => value ?? [])
  public likes: string[];

  @Expose({ name: Property.Likes })
  @Transform(({ obj }) => obj.likes.length)
  public likeCount: number;

  @Expose({ name: Property.Comments })
  @Transform(({ obj }) => obj.comments.length)
  public commentsCount: number;
}

export class PostLinkRDO extends IntersectionType(PostAddRDO, LinkDTO) {}
export class PostQuoteRDO extends IntersectionType(PostAddRDO, PhotoDTO) {}
export class PostVideoRDO extends IntersectionType(PostAddRDO, VideoDTO) {}
export class PostTextRDO extends IntersectionType(PostAddRDO, TextDTO) {}
export class PostPhotoRDO extends IntersectionType(PostAddRDO, PhotoDTO) {}

export const RDOForType = (post: IPost) => {
  switch(post.type) {
    case ContentType.LINK:
      return PostLinkRDO
    case ContentType.QUOTE:
      return PostQuoteRDO
    case ContentType.TEXT:
      return PostTextRDO
    case ContentType.VIDEO:
      return PostVideoRDO
    case ContentType.PHOTO:
      return PostPhotoRDO
}}

export const DTOForType = (post: IPost) => {
  switch(post.type) {
    case ContentType.LINK:
      return LinkDTO
    case ContentType.QUOTE:
      return QuoteDTO
    case ContentType.TEXT:
      return TextDTO
    case ContentType.VIDEO:
      return VideoDTO
    case ContentType.PHOTO:
      return PhotoDTO
}}
