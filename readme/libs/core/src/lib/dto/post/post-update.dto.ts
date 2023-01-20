import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";
import PublishAt from "../../enum/property.enum";
import { APIOption } from "../../utils/api.utils";
import { PostCreateDTO } from "./post-create.dto";

class PostPublishAtDTO {
  @Expose()
  @IsDate()
  @IsOptional()
  @ApiProperty(APIOption.Post(PublishAt))
  publishAt?: Date;
}

export class PostUpdateDTO extends IntersectionType(
  PostPublishAtDTO,
  PartialType(PostCreateDTO)
) {}
