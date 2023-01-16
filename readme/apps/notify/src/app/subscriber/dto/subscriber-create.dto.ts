import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { FieldName, UserData, UserError, UsersAPIProp } from "@readme/core";
import { Expose } from "class-transformer";
import { IsEmail, IsMongoId, Validate } from "class-validator";
import { SubAlreadyExistsEmail, SubAlreadyExistsUserID } from "../validators/sub-exists.validator";

class SubBase {
  @Expose()
  @IsEmail({},{message: UserError.Email})
  @ApiProperty(UsersAPIProp[FieldName.Email])
  @Validate(SubAlreadyExistsEmail)
  public email: string;

  @Expose()
  @IsMongoId()
  @ApiProperty(UsersAPIProp[FieldName.UserID])
  @Validate(SubAlreadyExistsUserID)
  public userID: string;
}

export class SubscriberCreateDTO extends IntersectionType(
  PickType(UserData, ['name'] as const),
  SubBase
) {}
