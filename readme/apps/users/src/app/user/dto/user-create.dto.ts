import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { FieldName, UserDTO, UserError, UsersAPIProp } from "@readme/core";
import { Transform } from "class-transformer";
import { IsEmail, IsOptional, IsString, Validate } from "class-validator";
import { UserAlreadyExistsRule } from "../validators/user-exists.validator";

class UserCreateEmail {
  @IsEmail({},{message: UserError.Email})
  @ApiProperty(UsersAPIProp[FieldName.Email])
  @Validate(UserAlreadyExistsRule)
  public email: string;

  @IsString()
  @IsOptional()
  @Transform(({ obj }) => obj ? obj.path : '')
  @ApiProperty(UsersAPIProp[FieldName.Avatar])
  public avatar?: string
}

export class UserCreateDTO extends IntersectionType(
  PickType(UserDTO, ['email', 'name', 'password'] as const),
  UserCreateEmail
) {}
