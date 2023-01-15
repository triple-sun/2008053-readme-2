import { IntersectionType, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";
import { PostCreateDTO } from "./post-create.dto";

class PublishAt {
  @Expose()
  @IsDate()
  @IsOptional()
  publishAt?: Date;
}

export class PostUpdateDTO extends IntersectionType(
  PublishAt,
  PartialType(PostCreateDTO)
) {}
