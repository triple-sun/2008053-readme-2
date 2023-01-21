import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";
import { APIOption, PostCreateDTO, Property } from "@readme/core";
import { Expose } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

class PublishAtDTO {
  @Expose()
  @IsDate()
  @IsOptional()
  @ApiProperty(APIOption.PostProperty(Property.PublishAt))
  publishAt?: Date;
}

export class PostUpdateDTO extends IntersectionType(
  PublishAtDTO,
  PartialType(PostCreateDTO)
) {}
