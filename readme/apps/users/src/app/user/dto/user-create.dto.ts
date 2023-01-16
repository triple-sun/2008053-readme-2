import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { FieldName, User, UserError, UsersAPIProp } from "@readme/core";
import { IsEmail, IsOptional, IsString, Validate } from "class-validator";
import { UserAlreadyExistsRule } from "../validators/user-exists.validator";

class UserCreateEmail {
  @IsEmail({},{message: UserError.Email})
  @ApiProperty(UsersAPIProp[FieldName.Email])
  @Validate(UserAlreadyExistsRule)
  public email: string;

  @IsString()
  @IsOptional()
  @ApiProperty(UsersAPIProp[FieldName.Avatar])
  public avatar?: Express.Multer.File
}

export class UserCreateDTO extends IntersectionType(
  PickType(User, ['email', 'name', 'password'] as const),
  UserCreateEmail
) {}
