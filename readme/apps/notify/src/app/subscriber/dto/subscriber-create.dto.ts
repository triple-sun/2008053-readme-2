import { ApiProperty, PickType } from "@nestjs/swagger";
import { APIProp, Property, UserDTO, ValidationMessage } from "@readme/core";
import { Expose } from "class-transformer";
import { IsEmail, IsMongoId, Validate } from "class-validator";
import { SubAlreadyExistsEmail, SubAlreadyExistsUserID } from "../validators/sub-exists.validator";

const { UserID, Email } = Property

export class SubscriberCreateDTO extends PickType(UserDTO, ['email', 'name', 'userID'] as const) {
  @Expose()
  @IsEmail({},{message: ValidationMessage.Email})
  @ApiProperty(APIProp.Users(Email))
  @Validate(SubAlreadyExistsEmail)
  public email: string;

  @Expose()
  @IsMongoId()
  @ApiProperty(APIProp.Users(UserID))
  @Validate(SubAlreadyExistsUserID)
  public userID: string;
}
