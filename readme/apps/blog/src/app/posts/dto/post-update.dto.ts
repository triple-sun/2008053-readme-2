import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { MinMax } from "@readme/core";
import { Link, Photo, Quote, Text, Video } from "@readme/shared-types";
import { Content, ContentType } from "../../../../../../libs/shared-types/src/lib/content/content-type.const";
import { APIDesc, APIExample, ContentExample } from "../post.enum";

export class PostUpdateDTO {
  @ApiProperty({
    description: APIDesc.Type,
    example: ContentType.Link,
    enum: ContentType,
  })
  public type!: string;

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
  public content: Content;

  @ApiProperty({
    description: APIDesc.Tags,
    example: APIExample.Tags,
    default: [],
    maxItems: MinMax.TagsMax,
  })
  public tags?: string[];
}
