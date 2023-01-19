import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";
import { Property } from "../../enum/property.enum";
import { APIProp } from "../../utils/api.utils";
import { PostCreateDTO } from "./post-create.dto";

const { PublishAt } = Property;
const { Post } = APIProp

class PostPublishAtDTO {
  @Expose()
  @IsDate()
  @IsOptional()
  @ApiProperty(Post(PublishAt))
  publishAt?: Date;
}

export class PostUpdateDTO extends IntersectionType(
  PostPublishAtDTO,
  PartialType(PostCreateDTO)
) {}
