import { ApiProperty, ApiPropertyOptional, IntersectionType, PickType } from "@nestjs/swagger"
import { ContentType } from "@prisma/client";
import { Expose, Transform } from "class-transformer"
import { IsArray, IsBoolean, IsInt, IsMongoId, IsNumber, ValidateIf } from "class-validator";
import { Property } from "../../enum/property.enum"
import { PostProperty } from "../../utils/api.utils";
import { LinkRDO } from "../content/link.dto";
import { PhotoRDO } from "../content/photo.dto";
import { QuoteRDO } from "../content/quote.dto";
import { TextRDO } from "../content/text.dto";
import { VideoRDO } from "../content/video.dto";
import { Post } from "./post.dto";

const { Likes, Comments  } = Property

export class ContentRDO extends IntersectionType(
  IntersectionType(VideoRDO, QuoteRDO),
  IntersectionType(TextRDO, IntersectionType(PhotoRDO, LinkRDO))
) {}

export class PostRDO extends IntersectionType(
  ContentRDO,
  Post
) {
  @Expose({ name: Property.ID})
  public postID: number

  @Expose()
  public type: ContentType;

  @Expose()
  @IsBoolean()
  @ApiProperty(PostProperty(Property.IsRepost, {default: false}))
  public isRepost: boolean;

  @Expose()
  @IsBoolean()
  @ApiProperty(PostProperty(Property.Type, {default: false}))
  public isDraft: boolean;

  @Expose()
  @IsMongoId()
  @ApiProperty(PostProperty(Property.Type))
  public authorID: string;

  @Expose()
  @IsNumber()
  public originID: number;

  @Expose()
  @IsArray()
  public tags?: string[];

  @Expose()
  @ValidateIf(o => o.comments.length > 0)
  @IsInt({each: true})
  @Transform(({value}) => value ?? [])
  public comments: number[];

  @Expose()
  @ValidateIf(o => o.comments.length > 0)
  @IsMongoId({each: true})
  @Transform(({ value }) => value ?? [])
  public likes: string[];

  @Expose({ name: Likes })
  @ValidateIf(o => o.likes.length > 0)
  @Transform(({ obj }) => obj.likes.length)
  public likeCount: number;

  @ValidateIf(o => o.comments.length > 0)
  @Expose({ name: Comments })
  @Transform(({ obj }) => obj.comments.length)
  public commentsCount: number;
}

