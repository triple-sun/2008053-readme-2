import { Expose, Transform } from 'class-transformer';
import { IntersectionType } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';

import { IsArray, IsBoolean, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class PostDataRDO {
  @Expose()
  @IsNumber()
  public id: number;

  @Expose()
  public type: ContentType;

  @Expose()
  @IsArray()
  @Transform(({value}) => value.length)
  public comments: number;

  @Expose()
  @IsArray()
  @IsMongoId({each: true})
  @Transform(({value}) => value.length)
  public likes: number;

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
  @IsOptional()
  @IsArray()
  public tags: string[];
}

export class TitleRDO {
  @Expose()
  @IsString()
  public title: string;
}

export class TextRDO extends IntersectionType(TitleRDO, PostDataRDO) {
  @Expose()
  @IsString()
  public text: string;

  @Expose()
  @IsString()
  public ann: string;
}

export class VideoRDO extends IntersectionType(TitleRDO, PostDataRDO) {
  @Expose()
  @IsString()
  public videoLink: string;
}

export class PostPhotoRDO extends PostDataRDO {
  @Expose()
  @IsString()
  public photoLink: string;
}

export class QuoteRDO extends PostDataRDO {
  @Expose()
  @IsString()
  public author: string;

  @Expose()
  @IsString()
  public quote: string;
}

export class PostLinkRDO extends PostDataRDO {
  @Expose()
  @IsString()
  public webLink: string;

  @Expose()
  @IsOptional()
  @IsString()
  public desc?: string;
}

export class PostRDO extends IntersectionType(
  IntersectionType(VideoRDO, QuoteRDO),
  IntersectionType(TextRDO, IntersectionType(PostPhotoRDO, PostLinkRDO))
) {}

export type TPostRDO = VideoRDO | QuoteRDO | TextRDO | PostPhotoRDO | PostLinkRDO
