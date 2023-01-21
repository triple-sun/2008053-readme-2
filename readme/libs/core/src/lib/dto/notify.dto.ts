import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray } from "class-validator";
import { Property } from "../enum/property.enum";
import { UserProperty } from "../utils/api.utils";
import { PostRDO, } from "./post/post-rdo.dto";
import { UserCreateDTO } from "./user/user.dto";

export class PostsDTO {
  @Expose()
  @IsArray()
  @Type(() => PostRDO)
  @ApiProperty(UserProperty(Property.Posts))
  public posts: PostRDO[];
}

export class NotifyDTO extends IntersectionType(
  PostsDTO,
  PickType(UserCreateDTO, ['userID', 'email'] as const)
) {}
