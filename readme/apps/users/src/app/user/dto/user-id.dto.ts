import { ApiProperty } from "@nestjs/swagger";
import { APIProp, Property } from "@readme/core";
import { Expose } from "class-transformer";
import { IsMongoId, Validate } from "class-validator";
import { UserExistIDRule } from "../validators/user-exists.validator";

export class UserIDDTO {
  @Expose()
  @IsMongoId()
  @ApiProperty(APIProp.Users(Property.UserID))
  @Validate(UserExistIDRule)
  public userID?: string;
}
