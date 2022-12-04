import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { Post } from "@prisma/client";
import { Expose } from "class-transformer";
import { APIDesc, APIExample } from "../comment.enum";
import { CommentCreateDTO } from "../dto/comment-create.dto";

class CommentRDOBase {
  @ApiProperty({
    description: APIDesc.CommentID,
    required: true
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: APIDesc.Post,
    example: APIExample.ID,
    required: true
  })
  @Expose()
  public post: Post;
}

export class CommentRDO extends IntersectionType (
  CommentRDOBase,
  CommentCreateDTO
  ) {}
