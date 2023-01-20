import { ApiProperty } from "@nestjs/swagger";
import { APIOption, Property } from "@readme/core";
import { Expose } from "class-transformer";
import { IsMongoId, Validate } from "class-validator";
import { UserExistIDRule } from "../validators/user-exists.validator";

export class UserSubscribeDTO {
  @Expose()
  @IsMongoId()
  @ApiProperty(APIOption.User(Property.SubToID))
  @Validate(UserExistIDRule)
  public subToID: string;
}
