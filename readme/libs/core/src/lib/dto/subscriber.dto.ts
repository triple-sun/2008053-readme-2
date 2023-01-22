import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsMongoId } from "class-validator";
import { ObjectId } from "mongoose";
import { Property } from "../enum/property.enum";
import { UserProperty } from "../utils/api.utils";
import { UserDTO } from "./user/user.dto";

export class SubscriberCreateDTO extends PickType(UserDTO, ['email', 'name', 'id'] as const) {
  @Expose({ name: Property.Id })
  @IsMongoId()
  @ApiProperty(UserProperty(Property.UserID))
  public userId: ObjectId
}

export class SubscriberUpdateDTO extends PartialType(SubscriberCreateDTO) {}

