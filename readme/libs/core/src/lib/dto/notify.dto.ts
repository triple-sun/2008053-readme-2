import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { Post } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsArray } from "class-validator";
import { Property } from "../enum/property.enum";
import { UserProperty } from "../utils/api.utils";
import { SubscriberDTO } from "./subscriber.dto";

export class PostsDTO {
  @Expose()
  @IsArray()
  @ApiProperty(UserProperty(Property.Posts))
  public posts: Post[];
}

export class NotifyDTO extends IntersectionType(
  PostsDTO,
  PickType(SubscriberDTO, ['email', 'name'] as const)
) {}
