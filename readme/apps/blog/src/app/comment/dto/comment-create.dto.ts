import { ApiProperty } from "@nestjs/swagger";
import { APIDesc, APIExample } from "../comment.enum";

export class CommentCreateDTO {
  @ApiProperty({
    description: APIDesc.Text,
    example: APIExample.Text
  })
  public text: string;

  @ApiProperty({
    description: APIDesc.PostID,
    example: APIExample.ID
  })
  public postID: string;

  @ApiProperty({
    description: APIDesc.UserID,
    example: APIExample.ID
  })
  public userID: string;
}
