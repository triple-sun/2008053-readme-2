import { ApiProperty } from "@nestjs/swagger";
import { Content, ContentType } from "@readme/shared-types";
import { APIDesc, APIExample } from "../post.enum";

export class PostCreateDTO {
  @ApiProperty({
    description: APIDesc.Type,
    example: ContentType.Link,
    enum: ContentType,
    required: true
  })
  public type: ContentType;

  @ApiProperty({
    description: APIDesc.Content,
    example: {
      link: APIExample.Link,
      desc: APIExample.Desc
    },
    required: true
  })
  public content: Content

  @ApiProperty({
    description: APIDesc.Tags,
    example: APIExample.Tags
  })
  public tags?: string[];

  @ApiProperty({
    description: APIDesc.Draft,
    example: true,
    default: false
  })
  public isDraft: boolean;

  @ApiProperty({
    description: APIDesc.UserID,
    example: APIExample.ID,
    required: true
  })
  public userID: string;
}
