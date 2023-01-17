import { IntersectionType, PartialType } from "@nestjs/swagger";
import { PostCreateDTO } from "@readme/core";
import { Expose } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

class PublishAtDTO {
  @Expose()
  @IsDate()
  @IsOptional()
  publishAt?: Date;
}

export class PostUpdateDTO extends IntersectionType(
  PublishAtDTO,
  PartialType(PostCreateDTO)
) {}
