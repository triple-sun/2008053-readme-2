import { ApiProperty } from '@nestjs/swagger';
import { ParamName } from '@readme/core';
import { Content, ContentType } from '@readme/shared-types';
import {Expose} from 'class-transformer';
import { APIDesc, APIExample } from '../post.enum';

export class PostRDO {
  @ApiProperty({
    description: APIDesc.ID,
    example: APIExample.ID,
    required: true
  })
  @Expose({ name: ParamName.ObjectID})
  public _id: string;

  @ApiProperty({
    description: APIDesc.Type,
    example: APIExample.Type,
    required: true,
    enum: ContentType
  })
  @Expose()
  public type: ContentType;

  @ApiProperty({
    description: APIDesc.Content,
    example: {
      link: APIExample.Link,
      desc: APIExample.Desc
    },
    required: true
  })
  @Expose()
  public content: Content

  @ApiProperty({
    description: APIDesc.Tags,
    example: APIExample.Tags,
  })
  @Expose()
  public tags?: string[];

  @ApiProperty({
    description: APIDesc.Draft,
    example: APIExample.Bool
  })
  @Expose()
  public isDraft: boolean;

  @ApiProperty({
    description: APIDesc.Repost,
    example: APIExample.Bool
  })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({
    description: APIDesc.AuthorID,
    example: APIExample.ID
  })
  @Expose()
  public authorID: string;

  @ApiProperty({
    description: APIDesc.OriginID,
    example: APIExample.ID
  })
  @Expose()
  public originID: string;

  @ApiProperty({
    description: APIDesc.UserID,
    example: APIExample.ID
  })
  @Expose()
  public userID: string;
}
