import { ApiProperty } from "@nestjs/swagger";
import { KeyName } from "@readme/core";
import { Expose } from "class-transformer";
import { APIDesc, APIExample } from "../comment.enum";

export class CommentRDO {
  @ApiProperty({
    description: APIDesc.CommentID,
    example: APIExample.ID,
  })
  @Expose({ name: KeyName.ObjectID})
  public id: string;

  @ApiProperty({
    description: APIDesc.Text,
    example: APIExample.Text,
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: APIDesc.PostID,
    example: APIExample.ID,
  })
  @Expose()
  public postID: string;

  @ApiProperty({
    description: APIDesc.UserID,
    example: APIExample.ID,
  })
  @Expose()
  public userID: string;
}
