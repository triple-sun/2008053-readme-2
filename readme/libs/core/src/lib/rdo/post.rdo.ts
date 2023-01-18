import { Expose, Transform } from 'class-transformer';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';

import { IsArray, IsBoolean, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { PostAPIProp } from '../api-props/post/post.api-prop';

export class PostBaseRDO {
  @Expose()
  @IsNumber()
  @ApiProperty(PostAPIProp.PostID)
  public id: number;

  @Expose()
  @ApiProperty(PostAPIProp.Type)
  public type: ContentType;

  @Expose()
  @IsArray()
  @Transform(({value}) => value.length)
  @ApiProperty()
  public comments: Comment[];

  @Expose()
  @IsMongoId({each: true})
  @Transform(({value}) => value.length)
  @IsArray()
  @ApiProperty()
  public likes: number;

  @Expose()
  @IsBoolean()
  @ApiProperty(PostAPIProp.IsRepost)
  public isRepost: boolean;

  @Expose()
  @IsBoolean()
  @ApiProperty(PostAPIProp.IsDraft)
  public isDraft: boolean;

  @Expose()
  @IsMongoId()
  @ApiProperty(PostAPIProp.AuthorID)
  public authorID: string;

  @Expose()
  @IsNumber()
  @ApiProperty(PostAPIProp.OriginID)
  public originID: number;

  @Expose()
  @IsOptional()
  @IsArray()
  @ApiProperty(PostAPIProp.Tags)
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
