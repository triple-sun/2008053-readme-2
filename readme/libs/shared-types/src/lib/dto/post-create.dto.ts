import { ApiProperty } from "@nestjs/swagger";
import { MinMax } from "@readme/core";
import { Content, PostAPIDesc, PostAPIExample } from "@readme/shared-types";
import { Expose } from "class-transformer";


export class PostCreateDTO {
  @Expose()
  public content: Content;

  @ApiProperty({
    description: PostAPIDesc.Tags,
    example: PostAPIExample.Tags,
    default: [],
    maxItems: MinMax.TagsMax,
  })
  @Expose()
  public tags?: string[];

  @ApiProperty({
    description: PostAPIDesc.UserID,
    example: PostAPIExample.ID,
    required: true
  })
  @Expose()
  public userID: string;
}
