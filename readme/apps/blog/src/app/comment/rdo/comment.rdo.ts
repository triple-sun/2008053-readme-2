import { Expose } from "class-transformer";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";

import { CommentCreateDTO } from "../dto/comment-create.dto";
import { IsInt } from "class-validator";
import { CommentAPIProp, FieldName } from "@readme/core";

class CommentRDOBase {
  @Expose()
  @IsInt()
  @ApiProperty(CommentAPIProp[FieldName.ID])
  public id: string;
}

export class CommentRDO extends IntersectionType (
  CommentRDOBase,
  CommentCreateDTO
  ) {}
