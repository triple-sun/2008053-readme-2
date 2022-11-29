import { ApiProperty } from "@nestjs/swagger";
import { MinMax } from "@readme/core";
import {  Content, ContentType } from "@readme/shared-types";
import { APIDesc, APIExample } from "../post.enum";

export class PostUpdateDTO {
  @ApiProperty({
    description: APIDesc.Type,
    example: APIExample.Type,
    enum: ContentType,
  })
  public type!: string;

  @ApiProperty({
    description: APIDesc.Content,
    example: {
      link: APIExample.Link,
      desc: APIExample.Desc
    }
  })
  public content: Content

  @ApiProperty({
    description: APIDesc.Tags,
    example: APIExample.Tags,
    default: [],
    maxItems: MinMax.TagsMax,
  })
  public tags?: string[];
}
