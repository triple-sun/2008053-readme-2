import { ApiProperty, getSchemaPath, IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { ArrayMaxSize, IsBoolean, IsDate, IsInt, IsMongoId, IsOptional, IsString, IsUrl, Matches, MaxLength, ValidateIf, ValidateNested } from "class-validator";
import { IPost } from "@readme/shared-types";

import { Property } from "../../enum/property.enum";
import { CommentProperty, PostProperty } from "../../utils/api.utils";
import { Size } from "../../utils/size.utils";
import { ValidateLength } from "../../decorator/validate-length.decorator";
import { Entity } from "../../enum/utils.enum";
import { getOptions } from "../../utils/schema.utils";
import { PageDTO, TypeDTO } from "./posts.query.dto";
import { IMAGE_MIME_TYPES, YoutubeLinkRegExp } from "../../const/utils.const";
import { Photo, Quote, Title } from "../content.dto";
import { LengthError } from "../../const/error.const";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";
import { UserIDDTO } from "../user/user.dto";
import { fillObject } from "../../utils/common.utils";
import { APIExample } from "../../enum/api-example.enum";

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

type TContent = VideoDTO | QuoteDTO | LinkDTO | TextDTO | PhotoDTO

const DTOForType = {
  [ContentType.LINK]: LinkDTO,
  [ContentType.QUOTE]: QuoteDTO,
  [ContentType.VIDEO]: VideoDTO,
  [ContentType.TEXT]: TextDTO,
  [ContentType.PHOTO]: PhotoDTO,
}

export class ContentDTO extends TypeDTO {
  @Expose()
  @ValidateNested()
  @Transform(({ obj, value }) => fillObject(DTOForType[obj.type], value))
  @ApiProperty(PostProperty(Property.Content, {
    oneOf:[
      { $ref: getSchemaPath(VideoDTO) },
      { $ref: getSchemaPath(PhotoDTO) },
      { $ref: getSchemaPath(TextDTO) },
      { $ref: getSchemaPath(QuoteDTO) },
      { $ref: getSchemaPath(LinkDTO) },
    ]
  }))
  public content: TContent
}

export class PostIDDTO {
  @Expose({ name: Property.Id})
  @Transform(({value}) => +value)
  @ApiProperty(getOptions(Entity.Post, Property.Id, {example: APIExample.PostId}))
  public postId: number;
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

  @ApiProperty(CommentProperty(Property.UserId))
  public userId: string

  @ApiProperty(CommentProperty(Property.PostId))
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

export class PostAddRDO extends TypeDTO {
  @Expose()
  @IsOptional()
  @IsDate()
  public publishAt: Date;

  @Expose()
  @IsBoolean()
  public isRepost: boolean;

  @Expose()
  @IsBoolean()
  @Transform(({obj, value}) => obj.publishAt < new Date() ? !value : !!value)
  public isDraft: boolean;

  @Expose()
  @IsMongoId()
  public authorID: string;

  @Expose()
  @IsInt()
  public originID: number;

  @Expose()
  @Type(() => CommentRDO)
  @Transform(({value}) => value ?? [])
  public comments: Comment[];

  @Expose()
  @IsMongoId({each: true})
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

export class PostCreateDTO extends ContentDTO {
  @Expose()
  @IsOptional()
  @ValidateLength()
  @ValidateIf(o => o.tags.length > 0)
  @ArrayMaxSize(Size.Tags.Max)
  @Transform(({ value }) => value ? [...(new Set(
    value.map((tag: string) => tag.toLowerCase())
  ))] : [])
  @ApiPropertyOptional(PostProperty(Property.Tags, { maxItems: Size.Tags.Max }))
  public tags?: string[];
}

export class PostLinkDTO extends PostCreateDTO {
  public readonly type = ContentType.LINK

  @Type(() => LinkDTO)
  public content: LinkDTO
}

export class PostQuoteDTO extends PostCreateDTO {
  public readonly type = ContentType.QUOTE

  @Type(() => QuoteDTO)
  public content: QuoteDTO
}

export class PostPhotoDTO extends PostCreateDTO {
  public readonly type = ContentType.PHOTO

  @Type(() => PhotoDTO)
  public content: PhotoDTO
}

export class PostVideoDTO extends PostCreateDTO {
  public readonly type = ContentType.VIDEO

  @Type(() => VideoDTO)
  public content: VideoDTO
}

export class PostTextDTO extends PostCreateDTO {
  public readonly type = ContentType.TEXT

  @Type(() => TextDTO)
  public content: TextDTO
}

export const fillRDOForPost = (post: IPost) => {
  switch(post.type) {
    case ContentType.LINK:
      return fillObject(PostLinkRDO, post)
    case ContentType.QUOTE:
      return fillObject(PostQuoteRDO, post)
    case ContentType.TEXT:
      return fillObject(PostTextRDO, post)
    case ContentType.VIDEO:
      return fillObject(PostVideoRDO, post)
    case ContentType.PHOTO:
      return fillObject(PostPhotoRDO, post)
}}

export const fillDTOForPost = (dto: PostCreateDTO) => {
  switch(dto.type) {
    case ContentType.LINK:
      return fillObject(PostLinkDTO, dto)
    case ContentType.QUOTE:
      return fillObject(PostQuoteDTO, dto)
    case ContentType.TEXT:
      return fillObject(PostTextDTO, dto)
    case ContentType.VIDEO:
      return fillObject(PostVideoDTO, dto)
    case ContentType.PHOTO:
      return fillObject(PostPhotoDTO, dto)
}}

export class FillRDO<T, K> {
  private readonly data: T
  private readonly rdo: K
  constructor(data: T) {
    this.data = data
  }
}

export class PostUpdateDTO extends PartialType(
  IntersectionType(
    PostCreateDTO,
    PickType(PostAddRDO, ['publishAt'] as const
  ))
) {
  @ValidateIf(o => o.content && o.type)
  public type?: ContentType

  @ValidateIf(o => o.type && o.content)
  public content?: TContent

  @ValidateIf(o => o.tags.length > 0)
  public tags?: string[]
}

