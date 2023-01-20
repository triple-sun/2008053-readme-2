import { ApiProperty, PickType } from "@nestjs/swagger";
import { APIOption, Property, UserDTO } from "@readme/core";
import { ErrorMessage } from "@readme/error";
import { Expose } from "class-transformer";
import { IsEmail, IsMongoId, Validate } from "class-validator";
import { SubAlreadyExistsEmail, SubAlreadyExistsUserID } from "../validators/sub-exists.validator";

const { UserID, Email } = Property

export class SubscriberCreateDTO extends PickType(UserDTO, ['email', 'name', 'userID'] as const) {
  @Expose()
  @IsEmail({},{message: ErrorMessage.Email})
  @ApiProperty(APIOption.User(Email))
  @Validate(SubAlreadyExistsEmail)
  public email: string;

  @Expose()
  @IsMongoId()
  @ApiProperty(APIOption.User(UserID))
  @Validate(SubAlreadyExistsUserID)
  public userID: string;
}
