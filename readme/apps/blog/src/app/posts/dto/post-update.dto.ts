import { ApiProperty } from "@nestjs/swagger";
import { Content, ContentType } from "@readme/shared-types";
import { APIDesc, APIExample } from "../post.enum";

export class PostUpdateDTO {
  @ApiProperty({
    description: APIDesc.Type,
    example: APIExample.Type
  })
  public type?: ContentType;

  @ApiProperty({
    description: APIDesc.Content,
    example: {
      link: APIExample.Link,
      desc: APIExample.Desc
    }
  })
  public content?: Content

  @ApiProperty({
    description: APIDesc.Tags,
    example: APIExample.Tags
  })
  public tags?: string[];
}
