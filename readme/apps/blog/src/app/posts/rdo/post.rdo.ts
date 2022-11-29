import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { MinMax, KeyName } from '@readme/core';
import { Expose } from 'class-transformer';
import { ContentType } from '../../../../../../libs/shared-types/src/lib/content/content-type.const';
import { APIDesc, APIExample, ContentExample } from '../post.enum';
import { Link, LinkModel } from "../../../../../../libs/shared-types/src/lib/content/link.model";
import { Photo } from '../../../../../../libs/shared-types/src/lib/content/photo.model';
import { Quote } from '../../../../../../libs/shared-types/src/lib/content/quote.model';
import { Video } from '../../../../../../libs/shared-types/src/lib/content/video.model';
import { Text } from '../../../../../../libs/shared-types/src/lib/content/text.model';

export class PostRDO {
  @ApiProperty({
    description: APIDesc.ID,
    example: APIExample.ID,
    required: true,
  })
  @Expose({ name: KeyName.ObjectID})
  public id: string;

  @ApiProperty({
    description: APIDesc.Type,
    example: LinkModel.name,
    required: true,
    enum: ContentType,
    enumName: 'ContentType'
  })
  @Expose()
  public type: string;

  @ApiProperty({
    description: APIDesc.Content,
    oneOf: [
      { $ref: getSchemaPath(Link), example: ContentExample[ContentType.Link] },
      { $ref: getSchemaPath(Photo), example: ContentExample[ContentType.Photo] },
      { $ref: getSchemaPath(Quote), example: ContentExample[ContentType.Quote]  },
      { $ref: getSchemaPath(Text), example: ContentExample[ContentType.Text]  },
      { $ref: getSchemaPath(Video), example: ContentExample[ContentType.Video]  },
    ]
  })
  @Expose()
  public content: Link | Photo | Quote | Text | Video;

  @ApiProperty({
    description: APIDesc.Tags,
    example: APIExample.Tags,
    maxItems: MinMax.TagsMax,
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
