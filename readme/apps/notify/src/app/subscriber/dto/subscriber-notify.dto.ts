import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { Post } from "@prisma/client";
import { FieldName, UserError, UsersAPIProp, UserDTO } from "@readme/core";
import { Expose } from "class-transformer";
import { IsEmail, IsMongoId, Validate } from "class-validator";
import { SubExistsID } from "../validators/sub-exists.validator";

class SubBase {
  @Expose()
  @IsEmail({},{message: UserError.Email})
  @ApiProperty(UsersAPIProp[FieldName.Email])
  public posts: Post[];

  @Expose()
  @IsMongoId()
  @ApiProperty(UsersAPIProp[FieldName.UserID])
  @Validate(SubExistsID)
  public userID: string;
}

export class SubscriberNotifyDTO extends IntersectionType(
  PickType(UserDTO, ['name'] as const),
  SubBase
) {}
