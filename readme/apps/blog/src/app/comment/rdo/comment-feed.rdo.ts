import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { APIDesc, APIExample } from "../comment.enum";

export class CommentFeedRDO {
  @ApiProperty({
    description: APIDesc.Feed,
    example: APIExample.Feed,
  })
  @Expose()
  public comments: Comment[];
}
