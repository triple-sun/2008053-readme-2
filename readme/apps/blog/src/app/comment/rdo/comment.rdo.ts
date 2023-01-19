import { Expose, Transform } from "class-transformer";

import { IsMongoId, IsNumber, IsString } from "class-validator";
import { CommentCreateDTO } from "../dto/comment-create.dto";
import { Property } from "@readme/core";

export class CommentRDO extends CommentCreateDTO {
  @Expose()
  @IsNumber()
  public id: string;

  @Expose()
  @IsString()
  @IsMongoId()
  public userID: string;

  @Expose({ name: Property.Post })
  @Transform(({ obj }) => +obj.id)
  @IsNumber()
  public postID: number
}
