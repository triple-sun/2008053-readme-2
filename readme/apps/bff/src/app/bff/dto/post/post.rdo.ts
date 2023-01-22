import { IntersectionType } from "@nestjs/swagger";
import { ContentType } from "@prisma/client";
import { Property } from "@readme/core";
import { Expose, Transform } from "class-transformer"
import { IsArray, IsBoolean, IsMongoId, IsNumber } from "class-validator";
import { Link } from "../content/link.dto";
import { Photo } from "../content/photo.dto";
import { Quote } from "../content/quote.dto";
import { Text } from "../content/text.dto";
import { Video } from "../content/video.dto";

export class PostDataRDO {
  @Expose({ name: Property.Id})
  public id: number

  @Expose()
  public type: ContentType;

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
  @IsNumber()
  public originID: number;

  @Expose()
  @IsArray()
  public tags?: string[];

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

export class PostVideoRDO extends IntersectionType(Video, PostDataRDO) {}
export class PostQuoteRDO extends IntersectionType(Quote, PostDataRDO) {}
export class PostTextRDO extends IntersectionType(Text, PostDataRDO) {}
export class PostPhotoRDO extends IntersectionType(Photo, PostDataRDO) {}
export class PostLinkRDO extends IntersectionType(Link, PostDataRDO) {}
