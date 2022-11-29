import { ApiProperty } from "@nestjs/swagger";
import { MinMax } from "@readme/core";
import { Content, ContentType } from "@readme/shared-types";
import { APIDesc, APIExample } from "../post.enum";

export class PostCreateDTO {
  @ApiProperty({
    description: APIDesc.Type,
    example: ContentType.Link,
    enum: ContentType,
    default: ContentType.Link,
    required: true
  })
  public type: string;

  @ApiProperty({
    description: APIDesc.Content,
    example: {
      'link': APIExample.Link,
      'desc': APIExample.Desc
    },
    required: true,
  })
  public content: Content

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
