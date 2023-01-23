import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { IPost, ISub } from "@readme/shared-types";
import { Expose } from "class-transformer";
import { IsMongoId } from "class-validator";
import { Property } from "../enum/property.enum";
import { UserProperty } from "../utils/api.utils";
import { UserDTO } from "./user/user.dto";

export class SubscriberCreateDTO extends PickType(UserDTO, ['email', 'name', 'id'] as const) {
  @Expose({ name: Property.Id })
  @IsMongoId()
  @ApiProperty(UserProperty(Property.UserId))
  public userId: string
}

export class SubscriberUpdateDTO extends PartialType(SubscriberCreateDTO) {}

export class NotifyDTO {
  sub: ISub
  posts: IPost[]
}
