import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { FieldName, User, UserError, UsersAPIProp } from "@readme/core";
import { Expose } from "class-transformer";
import { IsEmail, IsMongoId, Validate } from "class-validator";
import { SubExistsEmail, SubExistsID } from "../validators/sub-exists.validator";

class SubBase {
  @Expose()
  @IsEmail({},{message: UserError.Email})
  @ApiProperty(UsersAPIProp[FieldName.Email])
  @Validate(SubExistsEmail)
  public email: string;

  @Expose()
  @IsMongoId()
  @ApiProperty(UsersAPIProp[FieldName.UserID])
  @Validate(SubExistsID)
  public userID: string;
}

export class SubscriberNotifyDTO extends IntersectionType(
  PickType(User, ['name'] as const),
  SubBase
) {}
