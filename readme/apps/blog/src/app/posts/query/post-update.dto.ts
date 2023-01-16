import { IntersectionType, PartialType } from "@nestjs/swagger";
import { PostCreateDTO } from "@readme/core";
import { Expose } from "class-transformer";
import { IsDate, IsOptional, Validate } from "class-validator";
import { PostExistsRule } from "../validators/post-exists.validator";

class PostUpdateBase {
  @Expose()
  @IsDate()
  @IsOptional()
  publishAt?: Date;

  @Expose()
  @IsDate()
  @IsOptional()
  @Validate(PostExistsRule)
  postID?: number;
}

export class PostUpdateDTO extends IntersectionType(
  PostUpdateBase,
  PartialType(PostCreateDTO)
) {}
