import { ApiProperty } from "@nestjs/swagger";
import { MinMax } from "@readme/core";
import { APIDesc, APIExample } from "../comment.enum";

export class CommentCreateDTO {
  @ApiProperty({
    description: APIDesc.Text,
    example: APIExample.Text,
    required: true,
    minLength: MinMax.CommentMin,
    maxLength: MinMax.CommentMax
  })
  public text: string;

  @ApiProperty({
    description: APIDesc.PostID,
    example: APIExample.ID,
    required: true
  })
  public postID: string;

  @ApiProperty({
    description: APIDesc.UserID,
    example: APIExample.ID,
    required: true
  })
  public userID: string;
}
