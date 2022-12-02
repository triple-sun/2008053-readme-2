import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { MinMax } from "@readme/core";
import { Content, ContentType, Link, Photo, Quote, Text, Video } from "@readme/shared-types";
import { Expose } from "class-transformer";
import { APIDesc, APIExample, ContentExample } from "../post.enum";

export class PostCreateDTO {
  @ApiProperty({
    description: APIDesc.Type,
    example: ContentType.Link,
    enum: ContentType,
    required: true
  })
  @Expose()
  public contentType: ContentType;

  @ApiProperty({
    description: APIDesc.Content,
    required: true,
    oneOf: [
      { $ref: getSchemaPath(Link), example: ContentExample[ContentType.Link] },
      { $ref: getSchemaPath(Photo), example: ContentExample[ContentType.Photo] },
      { $ref: getSchemaPath(Quote), example: ContentExample[ContentType.Quote]  },
      { $ref: getSchemaPath(Text), example: ContentExample[ContentType.Text]  },
      { $ref: getSchemaPath(Video), example: ContentExample[ContentType.Video]  },
    ]
  })
  @Expose()
  public content: Content;

  @ApiProperty({
    description: APIDesc.Tags,
    example: APIExample.Tags,
    default: [],
    maxItems: MinMax.TagsMax,
  })
  @Expose()
  public tags?: string[];

  @ApiProperty({
    description: APIDesc.Draft,
    default: false
  })
  @Expose()
  public isDraft?: boolean;

  @ApiProperty({
    description: APIDesc.UserID,
    example: APIExample.ID,
    required: true
  })
  @Expose()
  public userID: string;
}
