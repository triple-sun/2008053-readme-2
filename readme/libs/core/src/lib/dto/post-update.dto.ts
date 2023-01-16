import { IntersectionType, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";
import { PostCreateDTO } from "./post-create.dto";

class PostUpdateBase {
  @Expose()
  @IsDate()
  @IsOptional()
  publishAt?: Date;

  @Expose()
  @IsDate()
  @IsOptional()
  postID?: number;
}

export class PostUpdateDTO extends IntersectionType(
  PostUpdateBase,
  PartialType(PostCreateDTO)
) {}
