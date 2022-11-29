import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { MinMax } from "@readme/core";
import { Text } from "@readme/shared-types";
import { Content, ContentType } from "../../../../../../libs/shared-types/src/lib/content/content-type.const";
import { Link } from "../../../../../../libs/shared-types/src/lib/content/link.model";
import { Photo } from "../../../../../../libs/shared-types/src/lib/content/photo.model";
import { Quote } from "../../../../../../libs/shared-types/src/lib/content/quote.model";
import { Video } from "../../../../../../libs/shared-types/src/lib/content/video.model";
import { APIDesc, APIExample, ContentExample } from "../post.enum";

export class PostCreateDTO {
  @ApiProperty({
    description: APIDesc.Type,
    example: ContentType.Link,
    enum: ContentType,
    required: true
  })
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
  public content: Content;

  @ApiProperty({
    description: APIDesc.Tags,
    example: APIExample.Tags,
    default: [],
    maxItems: MinMax.TagsMax,
  })
  public tags?: string[];

  @ApiProperty({
    description: APIDesc.Draft,
    default: false
  })
  public isDraft?: boolean;

  @ApiProperty({
    description: APIDesc.UserID,
    example: APIExample.ID,
    required: true
  })
  public userID: string;
}
