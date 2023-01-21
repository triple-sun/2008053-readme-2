import { IntersectionType } from "@nestjs/swagger"
import { ContentType } from "@prisma/client";
import { Property } from "@readme/core";
import { Expose, Transform } from "class-transformer"
import { IsArray, IsBoolean, IsMongoId, IsNumber } from "class-validator";
import { LinkRDO } from "../content/link.dto";
import { PhotoRDO } from "../content/photo.dto";
import { QuoteRDO } from "../content/quote.dto";
import { TextRDO } from "../content/text.dto";
import { VideoRDO } from "../content/video.dto";
import { Post } from "./post.dto";

export class PostDataRDO extends Post {
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

export class PostRDO extends IntersectionType(
  IntersectionType(
    IntersectionType(VideoRDO, QuoteRDO),
    IntersectionType(TextRDO, PostDataRDO)
   ),
   IntersectionType(PhotoRDO, LinkRDO)
) {}
