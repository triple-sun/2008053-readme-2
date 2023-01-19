import { Expose, Transform } from 'class-transformer';
import { IntersectionType } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';

import { IsArray, IsBoolean, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class PostBaseRDO {
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
  public tags?: string[];
}

export class PostTextRDO extends PostBaseRDO {
  @Expose()
  @IsString()

  public title: string;

  @Expose()
  @IsString()
  public text: string;

  @Expose()
  @IsString()
  public ann: string;
}

export class PostVideoRDO extends PostBaseRDO {
  @Expose()
  @IsOptional()
  @IsString()
  public title?: string;

  @Expose()
  @IsString()
  public videoLink: string;
}

export class PostPhotoRDO extends PostBaseRDO {
  @Expose()
  @IsString()
  public photoLink: string;
}

export class PostQuoteRDO extends PostBaseRDO {
  @Expose()
  @IsString()
  public author: string;

  @Expose()
  @IsString()
  public quote: string;
}

export class PostLinkRDO extends PostBaseRDO {
  @Expose()
  @IsString()
  public link: string;

  @Expose()
  @IsOptional()
  @IsString()
  public desc?: string;
}


export class PostRDO extends IntersectionType(
  IntersectionType(PostVideoRDO, PostQuoteRDO),
  IntersectionType(PostTextRDO, IntersectionType(PostPhotoRDO, PostLinkRDO))
) {}

export type TPostRDO = (PostVideoRDO | PostQuoteRDO | PostTextRDO | PostPhotoRDO | PostLinkRDO)
