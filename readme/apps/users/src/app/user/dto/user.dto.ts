import { ApiProperty } from "@nestjs/swagger";
import { FieldName, UserError, UsersAPIProp } from "@readme/core";
import { Expose } from "class-transformer";
import { IsEmail, IsMongoId, Validate } from "class-validator";
import { UserExistEmailRule, UserExistIDRule } from "../validators/user-exists.validator";

export class UserDTO {
  @Expose()
  @IsEmail({},{message: UserError.Email})
  @ApiProperty(UsersAPIProp[FieldName.Email])
  @Validate(UserExistEmailRule)
  public email?: string;

  @Expose()
  @IsMongoId()
  @ApiProperty(UsersAPIProp[FieldName.UserID])
  @Validate(UserExistIDRule)
  public userID?: string;
}
